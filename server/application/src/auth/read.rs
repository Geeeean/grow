use crate::Connection;
use bcrypt::verify;
use diesel::{prelude::*, result::Error};
use domain::models::User;
use shared::{
    dto::auth_dto::{SigninRequest, UserResponse},
    jwt::AuthenticatedUser,
};

pub enum ReadError {
    WrongPassword,
    DbError(diesel::result::Error),
    BcryptError(bcrypt::BcryptError),
}

pub fn read_user(
    connection: &mut Connection,
    signin_req: SigninRequest,
) -> Result<UserResponse, ReadError> {
    use domain::schema::users::dsl::*;

    let user: User = match users
        .filter(email.eq(signin_req.email))
        .first::<User>(connection)
    {
        Ok(user) => user,
        Err(err) => return Err(ReadError::DbError(err)),
    };

    let password_match = match verify(signin_req.password, &user.password) {
        Ok(pswd_match) => pswd_match,
        Err(err) => return Err(ReadError::BcryptError(err)),
    };

    if !password_match {
        return Err(ReadError::WrongPassword);
    }

    Ok(UserResponse::new(user.id, user.email, user.name))
}
