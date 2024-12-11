use application::user::read::read_user;
use diesel::result::Error::NotFound;
use infrastructure::ServerState;
use rocket::http::Status;
use rocket::{get, State};
use shared::dto::auth_dto::UserResponse;
use shared::jwt::AuthenticatedUser;
use shared::response_models::{Response, SerializedResponse};

#[get("/")]
pub fn get_user(
    user: AuthenticatedUser,
    server_state: &State<ServerState>,
) -> SerializedResponse<UserResponse> {
    let mut connection = match server_state.get_db_connection() {
        Ok(conn) => conn,
        Err(_) => return Response::new_serialized_default_error(),
    };

    match read_user(&mut connection, user) {
        Ok(user) => Response::new_serialized(Status::Ok, "User retrieved successfully", Some(user)),
        Err(NotFound) => Response::new_serialized(Status::NotFound, "User not found", None),
        Err(_) => Response::new_serialized_default_error(),
    }
}
