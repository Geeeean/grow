use chrono::{Duration, Utc};
use jsonwebtoken::{
    decode, encode, errors::ErrorKind, Algorithm, DecodingKey, EncodingKey, Header, Validation,
};
use rocket::{
    http::Status,
    request::{FromRequest, Outcome},
    serde::{Deserialize, Serialize},
    Request,
};
use std::env::{self, VarError};
use uuid::Uuid;

#[derive(Debug, Deserialize, Serialize)]
pub struct Claims {
    pub subject_id: Uuid,
    exp: usize,
    iss: String,
    iat: usize,
}

#[derive(Debug)]
pub struct JWT {
    pub claims: Claims,
}

#[derive(Debug)]
pub enum JwtError {
    EnvError(VarError),
    TokenError(jsonwebtoken::errors::Error),
    TimestampError,
}

pub fn create_jwt(id: Uuid) -> Result<String, JwtError> {
    let secret = env::var("JWT_SECRET").map_err(JwtError::EnvError)?;

    let expiration = Utc::now()
        .checked_add_signed(Duration::seconds(60 * 60 * 24 * 30))
        .ok_or(JwtError::TimestampError)?
        .timestamp();

    let claims = Claims {
        subject_id: id,
        exp: expiration as usize,
        iat: Utc::now().timestamp() as usize,
        iss: "grow".to_string(),
    };

    let header = Header::new(Algorithm::HS512);

    encode(
        &header,
        &claims,
        &EncodingKey::from_secret(secret.as_bytes()),
    )
    .map_err(JwtError::TokenError)
}

fn decode_jwt(token: String) -> Result<Claims, ErrorKind> {
    let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set.");
    let token = token.trim_start_matches("Bearer").trim();

    match decode::<Claims>(
        &token,
        &DecodingKey::from_secret(secret.as_bytes()),
        &Validation::new(Algorithm::HS512),
    ) {
        Ok(token) => Ok(token.claims),
        Err(err) => Err(err.kind().to_owned()),
    }
}

pub struct AuthenticatedUser {
    pub id: Uuid,
}

#[derive(Debug)]
pub enum AuthError {
    MissingToken,
    InvalidToken,
    ExpiredToken,
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for AuthenticatedUser {
    type Error = ErrorKind;

    async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
        let cookies = request.cookies();

        let token = match cookies.get_private("grow.session-token") {
            Some(cookie) => cookie.value().to_string(),
            None => return Outcome::Error((Status::Unauthorized, ErrorKind::InvalidToken)),
        };

        match decode_jwt(token) {
            Ok(claims) => Outcome::Success(AuthenticatedUser {
                id: claims.subject_id,
            }),
            Err(error) => {
                let status = match error {
                    ErrorKind::ExpiredSignature => Status::Unauthorized,
                    ErrorKind::InvalidToken => Status::Unauthorized,
                    _ => Status::InternalServerError,
                };
                Outcome::Error((status, error))
            }
        }
    }
}
