use application::auth::create::{create_user, CreateError};
use application::auth::read::{read_user, ReadError};
use diesel::result::Error::{self, NotFound};
use diesel::result::{DatabaseErrorKind, Error::DatabaseError};
use infrastructure::ServerState;
use rocket::http::{Cookie, CookieJar, SameSite, Status};
use rocket::serde::json::Json;
use rocket::{post, State};
use shared::dto::auth_dto::{SigninRequest, SignupRequest, UserResponse};
use shared::dto::shared_dto::NoData;
use shared::jwt::{create_jwt, AuthenticatedUser};
use shared::response_models::{Response, SerializedResponse};

#[post("/signin", format = "json", data = "<signin_req>")]
pub fn signin(
    signin_req: Json<SigninRequest>,
    server_state: &State<ServerState>,
    cookies: &CookieJar<'_>,
) -> SerializedResponse<UserResponse> {
    let mut connection = match server_state.get_db_connection() {
        Ok(conn) => conn,
        Err(_) => return Response::new_serialized_default_error(),
    };

    let user = match read_user(&mut connection, signin_req.0) {
        Ok(user) => user,
        Err(error) => match error {
            ReadError::WrongPassword => {
                return Response::new_serialized(Status::Unauthorized, "Password is wrong", None)
            }
            ReadError::DbError(db_error) => {
                if let Some((status, message)) = get_read_db_error_status(db_error) {
                    return Response::new_serialized(status, message, None);
                } else {
                    return Response::new_serialized_default_error();
                }
            }
            ReadError::BcryptError(_) => return Response::new_serialized_default_error(),
        },
    };

    let token = match create_jwt(user.get_id()) {
        Ok(token) => token,
        Err(_) => return Response::new_serialized_default_error(),
    };

    let mut cookie = Cookie::new("grow.session-token", token);
    cookie.set_http_only(true);
    cookie.set_secure(false);
    cookie.set_same_site(SameSite::Lax);
    cookie.set_path("/api");
    cookies.add_private(cookie);

    Response::new_serialized(Status::Ok, "User successfully logged", Some(user))
}

#[post("/signup", format = "json", data = "<signup_req>")]
pub fn signup(
    server_state: &State<ServerState>,
    signup_req: Json<SignupRequest>,
) -> SerializedResponse<UserResponse> {
    let mut connection = match server_state.get_db_connection() {
        Ok(conn) => conn,
        Err(_) => return Response::new_serialized_default_error(),
    };

    let user = match create_user(&mut connection, signup_req.0) {
        Ok(user) => user,
        Err(error) => match error {
            CreateError::DbError(db_error) => {
                if let Some((status, message)) = get_create_db_error_status(db_error) {
                    return Response::new_serialized(status, message, None);
                } else {
                    return Response::new_serialized_default_error();
                }
            }
            CreateError::BcryptError(_) => return Response::new_serialized_default_error(),
        },
    };

    Response::new_serialized(Status::Created, "User successfully registered", Some(user))
}

#[post("/signout")]
pub fn signout(cookies: &CookieJar<'_>, _user: AuthenticatedUser) -> SerializedResponse<NoData> {
    cookies.remove_private(Cookie::build("grow.session-token").path("/api"));
    Response::new_serialized(Status::Ok, "User successfully logged out", None)
}

fn get_create_db_error_status(error: Error) -> Option<(Status, &'static str)> {
    match error {
        DatabaseError(error_kind, _) => match error_kind {
            DatabaseErrorKind::UniqueViolation => Some((
                Status::Conflict,
                "Email already taken. Please choose another email or sign in",
            )),
            DatabaseErrorKind::ForeignKeyViolation => Some((
                Status::BadRequest,
                "A related resource does not exist. Please check your input",
            )),
            DatabaseErrorKind::NotNullViolation => Some((
                Status::BadRequest,
                "A required field is missing. Please fill in all required fields",
            )),
            DatabaseErrorKind::CheckViolation => Some((
                Status::BadRequest,
                "Some input values are invalid. Please check the requirements",
            )),
            _ => None,
        },
        _ => None,
    }
}

fn get_read_db_error_status(error: Error) -> Option<(Status, &'static str)> {
    match error {
        NotFound => Some((Status::NotFound, "Email not found")),
        _ => None,
    }
}
