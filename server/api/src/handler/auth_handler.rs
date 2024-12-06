use application::auth::create::{create_user, CreateError};
use infrastructure::ServerState;
use rocket::http::Status;
use rocket::{post, serde::json::Json, State};
use shared::dto::auth_dto::{SigninRequest, SignupRequest, UserResponse};
use shared::response_models::{Response, SerializedResponse};

#[post("/signin")]
pub fn signin(server_state: &State<ServerState>) -> SerializedResponse<UserResponse> {
    Response::new(Status::Ok, "ciao", None).to_serialized()
}

#[post("/signup", format = "json", data = "<signup_req>")]
pub fn signup(
    server_state: &State<ServerState>,
    signup_req: Json<SignupRequest>,
) -> SerializedResponse<UserResponse> {
    let connection = match server_state.get_pool().get() {
        Ok(conn) => conn,
        Err(_) => {
            return Response::new(Status::InternalServerError, "Internal server error", None)
                .to_serialized();
        }
    };

    let user = match create_user(connection, signup_req.0) {
        Ok(user) => user,
        Err(error) => match error {
            CreateError::DbError(db_error) => todo!(),
            CreateError::BcryptError(bc_error) => todo!(),
        },
    };

    let user_response = UserResponse::new(user.id, user.email, user.name);

    Response::new(Status::Created, "User registered", Some(user_response)).to_serialized()
}
