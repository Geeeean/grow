use rocket::get;
use rocket::response::status::NotFound;

#[get("/")]
pub fn get_vineyards() -> String {
    todo!()
}

#[get("/<vineyard_id>")]
pub fn get_vineyard(vineyard_id: i32) -> Result<String, NotFound<String>> {
    println!("{}", vineyard_id);
    todo!()
}
