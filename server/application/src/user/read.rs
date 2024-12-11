use crate::Connection;
use bcrypt::verify;
use diesel::{prelude::*, result::Error};
use domain::models::User;
use shared::{
    dto::auth_dto::{SigninRequest, UserResponse},
    jwt::AuthenticatedUser,
};

pub fn read_user(
    connection: &mut Connection,
    user: AuthenticatedUser,
) -> Result<UserResponse, Error> {
    use domain::schema::users::dsl::*;

    let user_res = users.find(user.id).first::<User>(connection)?;

    Ok(UserResponse::new(
        user_res.id,
        user_res.email,
        user_res.name,
    ))
}
