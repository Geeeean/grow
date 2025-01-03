use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Serialize)]
pub struct UserResponse {
    #[serde(skip)]
    id: Uuid,
    email: String,
    name: String,
}

impl UserResponse {
    pub fn new(id: Uuid, email: String, name: String) -> Self {
        Self { id, email, name }
    }

    pub fn get_id(&self) -> Uuid {
        self.id
    }
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Eq)]
pub struct SignupRequest {
    pub email: String,
    pub name: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Eq)]
pub struct SigninRequest {
    pub email: String,
    pub password: String,
}
