#[macro_use]
extern crate rocket;
use api::auth_handler::{signin, signup};
use api::vineyard_handler::{get_vineyard, get_vineyards};

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/api/vineyard", routes![get_vineyards, get_vineyard])
        .mount("/api/auth", routes![signup, signin])
}
