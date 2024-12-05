use rocket::post;
use rocket::response::status::NotFound;

#[post("/signin")]
pub fn signin() -> String {
    todo!()
}

#[post("/signup")]
pub fn signup() -> Result<String, NotFound<String>> {
    todo!()
}
