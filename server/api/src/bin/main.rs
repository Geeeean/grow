#[macro_use]
extern crate rocket;
use api::handler::auth_handler::{signin, signup};
use api::handler::vineyard_handler::{get_vineyard, get_vineyards};
use infrastructure::ServerState;

#[launch]
fn rocket() -> _ {
    let server_state = ServerState::new();

    rocket::build()
        .manage(server_state)
        .mount("/api/vineyard", routes![get_vineyards, get_vineyard])
        .mount("/api/auth", routes![signup, signin])
}
