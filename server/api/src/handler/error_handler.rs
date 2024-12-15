use rocket::{catch, http::Status};
use shared::{
    dto::shared_dto::NoData,
    response_models::{Response, SerializedResponse},
};

#[catch(401)]
pub fn unauthorized() -> SerializedResponse<NoData> {
    Response::new_serialized(
        Status::Unauthorized,
        "You are not authorized to access this resource",
        None,
    )
}

#[catch(403)]
pub fn forbidden() -> SerializedResponse<NoData> {
    Response::new_serialized(
        Status::Forbidden,
        "You don't have permission to access this resource",
        None,
    )
}

#[catch(404)]
pub fn not_found() -> SerializedResponse<NoData> {
    Response::new_serialized(
        Status::NotFound,
        "The requested resource was not found",
        None,
    )
}

#[catch(400)]
pub fn bad_request() -> SerializedResponse<NoData> {
    Response::new_serialized(Status::BadRequest, "The request is invalid", None)
}

#[catch(422)]
pub fn unprocessable_entity() -> SerializedResponse<NoData> {
    Response::new_serialized(
        Status::UnprocessableEntity,
        "The request data is malformed",
        None,
    )
}

#[catch(default)]
pub fn internal_error() -> SerializedResponse<NoData> {
    Response::new_serialized_default_error()
}
