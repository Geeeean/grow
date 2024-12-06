use bcrypt::{hash, BcryptError, DEFAULT_COST};
use diesel::{
    insert_into,
    prelude::*,
    r2d2::{ConnectionManager, PooledConnection},
};
use domain::models::{NewUser, User};
use shared::dto::auth_dto::SignupRequest;

type Connection = PooledConnection<ConnectionManager<PgConnection>>;

pub enum CreateError {
    DbError(diesel::result::Error),
    BcryptError(bcrypt::BcryptError),
}

pub fn create_user(
    mut connection: Connection,
    signup_req: SignupRequest,
) -> Result<User, CreateError> {
    use domain::schema::users::dsl::*;

    let hashed_password = match hash(signup_req.password, DEFAULT_COST) {
        Ok(hp) => hp,
        Err(error) => return Err(CreateError::BcryptError(error)),
    };

    let new_user = NewUser {
        name: signup_req.name,
        email: signup_req.email,
        password: hashed_password,
    };

    insert_into(users)
        .values(&new_user)
        .get_result::<User>(&mut connection)
        .map_err(|x| CreateError::DbError(x))
}
