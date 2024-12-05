use domain::models::{User, Vineyard};
use rocket::serde::Serialize;

#[derive(Serialize)]
pub enum ResponseBody {
    User(User),
    Vineyards(Vec<Vineyard>),
}

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct Response {
    pub body: Option<ResponseBody>,
}
