use application::vineyard::read::{read_vineyard, read_vineyards};
use diesel::result::Error::NotFound;
use domain::models::Vineyard;
use infrastructure::ServerState;
use rocket::{get, http::Status, State};
use shared::response_models::{Response, SerializedResponse};

#[get("/")]
pub fn get_vineyards(server_state: &State<ServerState>) -> SerializedResponse<Vec<Vineyard>> {
    let connection = match server_state.get_pool().get() {
        Ok(conn) => conn,
        Err(_) => {
            return Response::new(Status::InternalServerError, "Internal server error", None)
                .to_serialized();
        }
    };

    match read_vineyards(connection) {
        Ok(vineyards) => Response::new(
            Status::Ok,
            "Vineyards retrieved successfully",
            Some(vineyards),
        )
        .to_serialized(),
        Err(NotFound) => {
            Response::new(Status::NotFound, "Vineyard not found", None).to_serialized()
        }
        Err(_) => Response::new(Status::InternalServerError, "Internal server error", None)
            .to_serialized(),
    }
}

#[get("/<vineyard_id>")]
pub fn get_vineyard(
    server_state: &State<ServerState>,
    vineyard_id: i32,
) -> SerializedResponse<Vineyard> {
    let connection = match server_state.get_pool().get() {
        Ok(conn) => conn,
        Err(_) => {
            return Response::new(Status::InternalServerError, "Internal server error", None)
                .to_serialized();
        }
    };

    match read_vineyard(connection, vineyard_id) {
        Ok(vineyard) => {
            Response::new(Status::Ok, "Vineyard retrieved successfully", Some(vineyard)).to_serialized()
        }
        Err(NotFound) => {
            Response::new(Status::NotFound, "Vineyard not found", None).to_serialized()
        }
        Err(_) => Response::new(Status::InternalServerError, "Internal server error", None)
            .to_serialized(),
    }
}
