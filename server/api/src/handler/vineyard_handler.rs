use application::vineyard::create::{
    create_cut, create_planting, create_treatment, create_trim, create_vineyard,
};
use application::vineyard::read::{read_vineyard, read_vineyards};
use diesel::result::Error::NotFound;
use infrastructure::ServerState;
use rocket::serde::json::Json;
use rocket::{get, http::Status, post, State};
use shared::dto::vineyard_dto::{
    NewVineyardActionRequest, NewVineyardPlantingRequest, NewVineyardRequest,
    NewVineyardTreatmentRequest, VineyardActionResponse, VineyardPlantingResponse,
    VineyardResponse, VineyardTreatmentResponse,
};
use shared::{
    jwt::AuthenticatedUser,
    response_models::{Response, SerializedResponse},
};

#[get("/")]
pub fn get_vineyards(
    user: AuthenticatedUser,
    server_state: &State<ServerState>,
) -> SerializedResponse<Vec<VineyardResponse>> {
    let mut connection = match server_state.get_db_connection() {
        Ok(conn) => conn,
        Err(_) => return Response::new_serialized_default_error(),
    };

    match read_vineyards(&mut connection, user) {
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
    let mut connection = match server_state.get_db_connection() {
        Ok(conn) => conn,
        Err(_) => return Response::new_serialized_default_error(),
    };

    match read_vineyard(vineyard_id, &mut connection, user) {
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
    let mut connection = match server_state.get_db_connection() {
        Ok(conn) => conn,
        Err(_) => {
            return Response::new_serialized_default_error();
        }
    };

    match create_vineyard(vineyard_req.0, &mut connection, user) {
        Ok(vineyard) => {
            Response::new_serialized(Status::Ok, "Vineyard created successfully", Some(vineyard))
        }
        Err(_) => {
            return Response::new_serialized_default_error();
        }
    }
}

#[post("/trim", format = "json", data = "<trim_req>")]
pub fn new_vineyard_trim(
    trim_req: Json<NewVineyardActionRequest>,
    user: AuthenticatedUser,
    server_state: &State<ServerState>,
) -> SerializedResponse<VineyardActionResponse> {
    let mut connection = match server_state.get_db_connection() {
        Ok(conn) => conn,
        Err(_) => {
            return Response::new_serialized_default_error();
        }
    };

    match create_trim(trim_req.0, &mut connection, user) {
        Ok(trim) => {
            Response::new_serialized(Status::Ok, "Vineyard trim created successfully", Some(trim))
        }
        Err(_) => {
            return Response::new_serialized_default_error();
        }
    }
}

#[post("/cut", format = "json", data = "<cut_req>")]
pub fn new_vineyard_cut(
    cut_req: Json<NewVineyardActionRequest>,
    user: AuthenticatedUser,
    server_state: &State<ServerState>,
) -> SerializedResponse<VineyardActionResponse> {
    let mut connection = match server_state.get_db_connection() {
        Ok(conn) => conn,
        Err(_) => {
            return Response::new_serialized_default_error();
        }
    };

    match create_cut(cut_req.0, &mut connection, user) {
        Ok(cut) => {
            Response::new_serialized(Status::Ok, "Vineyard cut created successfully", Some(cut))
        }
        Err(_) => {
            return Response::new_serialized_default_error();
        }
    }
}

#[post("/planting", format = "json", data = "<planting_req>")]
pub fn new_vineyard_planting(
    planting_req: Json<NewVineyardPlantingRequest>,
    user: AuthenticatedUser,
    server_state: &State<ServerState>,
) -> SerializedResponse<VineyardPlantingResponse> {
    let mut connection = match server_state.get_db_connection() {
        Ok(conn) => conn,
        Err(_) => {
            return Response::new_serialized_default_error();
        }
    };

    match create_planting(planting_req.0, &mut connection, user) {
        Ok(planting) => Response::new_serialized(
            Status::Ok,
            "Vineyard planting created successfully",
            Some(planting),
        ),
        Err(error) => {
            println!("{:?}", error);
            return Response::new_serialized_default_error();
        }
    }
}

#[post("/treatment", format = "json", data = "<treatment_req>")]
pub fn new_vineyard_treatment(
    treatment_req: Json<NewVineyardTreatmentRequest>,
    user: AuthenticatedUser,
    server_state: &State<ServerState>,
) -> SerializedResponse<VineyardTreatmentResponse> {
    let mut connection = match server_state.get_db_connection() {
        Ok(conn) => conn,
        Err(_) => {
            return Response::new_serialized_default_error();
        }
    };

    match create_treatment(treatment_req.0, &mut connection, user) {
        Ok(treatment) => Response::new_serialized(
            Status::Ok,
            "Vineyard treatment created successfully",
            Some(treatment),
        ),
        Err(_) => {
            return Response::new_serialized_default_error();
        }
    }
}
