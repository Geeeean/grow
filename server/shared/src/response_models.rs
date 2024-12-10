use rocket::{
    http::Status,
    response::status,
    serde::{json::Json, Serialize},
};

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct Response<T: Serialize> {
    pub status: Status,
    pub message: String,
    pub data: Option<T>,
}

pub type SerializedResponse<T> = status::Custom<Json<Response<T>>>;

impl<T: Serialize> Response<T> {
    fn new(status: Status, message: &str, data: Option<T>) -> Self {
        Self {
            status,
            message: message.to_string(),
            data,
        }
    }

    fn to_serialized(self) -> SerializedResponse<T> {
        status::Custom(
            rocket::http::Status {
                code: self.status.code,
            },
            Json(self),
        )
    }

    pub fn new_serialized(status: Status, message: &str, data: Option<T>) -> SerializedResponse<T> {
        Self::new(status, message, data).to_serialized()
    }

    pub fn new_serialized_default_error() -> SerializedResponse<T> {
        Self::new_serialized(
            Status::InternalServerError,
            "Internal server error. Please try again or contact support.",
            None,
        )
    }
}

pub fn build_response<T: Serialize>(
    status: Status,
    message: &str,
    data: Option<T>,
) -> SerializedResponse<T> {
    Response::new(status, message, data).to_serialized()
}
