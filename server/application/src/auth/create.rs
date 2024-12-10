use crate::Connection;
use bcrypt::{hash, DEFAULT_COST};
use diesel::{insert_into, prelude::*};
use domain::models::{NewUser, User};
use shared::dto::auth_dto::SignupRequest;

pub enum CreateError {
    DbError(diesel::result::Error),
    BcryptError(bcrypt::BcryptError),
}

pub fn create_user(
    connection: &mut Connection,
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
        .get_result::<User>(connection)
        .map_err(|x| CreateError::DbError(x))
}
