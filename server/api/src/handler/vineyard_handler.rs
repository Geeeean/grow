use application::vineyard::create::create_vineyard;
use application::vineyard::read::{read_vineyard, read_vineyards};
use diesel::result::Error::NotFound;
use infrastructure::ServerState;
use log::{error, info};
use rocket::serde::json::Json;
use rocket::{get, http::Status, post, State};
use shared::dto::vineyard_dto::{NewVineyardRequest, VineyardResponse};
use shared::{
    jwt::AuthenticatedUser,
    response_models::{Response, SerializedResponse},
};

#[get("/")]
pub fn get_vineyards(
    user: AuthenticatedUser,
    server_state: &State<ServerState>,
) -> SerializedResponse<Vec<VineyardResponse>> {
    info!("user: {}", user.id);

    let connection = match server_state.get_db_connection() {
        Ok(conn) => conn,
        Err(_) => return Response::new_serialized_default_error(),
    };

    match read_vineyards(connection, user) {
        Ok(vineyards) => Response::new_serialized(
            Status::Ok,
            "Vineyards retrieved successfully",
            Some(vineyards),
        ),
        Err(NotFound) => Response::new_serialized(Status::NotFound, "Vineyard not found", None),
        Err(_) => Response::new_serialized_default_error(),
    }
}

#[get("/<vineyard_id>")]
pub fn get_vineyard(
    vineyard_id: i32,
    user: AuthenticatedUser,
    server_state: &State<ServerState>,
) -> SerializedResponse<VineyardResponse> {
    let connection = match server_state.get_db_connection() {
        Ok(conn) => conn,
        Err(_) => return Response::new_serialized_default_error(),
    };

    match read_vineyard(vineyard_id, connection, user) {
        Ok(vineyard) => Response::new_serialized(
            Status::Ok,
            "Vineyard retrieved successfully",
            Some(vineyard),
        ),
        Err(NotFound) => Response::new_serialized(Status::NotFound, "Vineyard not found", None),
        Err(_) => Response::new_serialized_default_error(),
    }
}

#[post("/", format = "json", data = "<vineyard_req>")]
pub fn new_vineyard(
    vineyard_req: Json<NewVineyardRequest>,
    user: AuthenticatedUser,
    server_state: &State<ServerState>,
) -> SerializedResponse<VineyardResponse> {
    let connection = match server_state.get_db_connection() {
        Ok(conn) => conn,
        Err(error) => {
            error!("ERROR {:?}", error);
            return Response::new_serialized_default_error();
        }
    };

    match create_vineyard(vineyard_req.0, connection, user) {
        Ok(vineyard) => Response::new_serialized(
            Status::Ok,
            "Vineyard retrieved successfully",
            Some(vineyard),
        ),
        Err(error) => {
            error!("ERROR {:?}", error);
            return Response::new_serialized_default_error();
        }
    }
}
