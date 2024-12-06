use rocket::{
    http::Status,
    response::status,
    serde::{json::Json, Serialize},
};

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct Response<T: Serialize> {
    pub status_code: Status,
    pub message: String,
    pub data: Option<T>,
}

pub type SerializedResponse<T> = status::Custom<Json<Response<T>>>;

impl<T: Serialize> Response<T> {
    pub fn new(status_code: Status, message: &str, data: Option<T>) -> Self {
        Self {
            status_code,
            message: message.to_string(),
            data,
        }
    }

    pub fn to_serialized(self) -> SerializedResponse<T> {
        status::Custom(
            rocket::http::Status {
                code: self.status_code.code,
            },
            Json(self),
        )
    }
}
