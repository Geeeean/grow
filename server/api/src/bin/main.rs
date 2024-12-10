#[macro_use]
extern crate rocket;
use api::handler::{
    auth_handler::{signin, signup},
    error_handler::{
        bad_request, forbidden, internal_error, not_found, unauthorized, unprocessable_entity,
    },
    vineyard_handler::{get_vineyard, get_vineyards, new_vineyard},
};
use dotenvy::dotenv;
use infrastructure::ServerState;

#[launch]
fn rocket() -> _ {
    dotenv().ok();

    let server_state = ServerState::new();

    rocket::build()
        .manage(server_state)
        .mount(
            "/api/vineyard",
            routes![get_vineyards, get_vineyard, new_vineyard],
        )
        .mount("/api/auth", routes![signup, signin])
        .register(
            "/api/",
            catchers![
                not_found,
                unauthorized,
                forbidden,
                bad_request,
                unprocessable_entity,
                internal_error,
            ],
        )
}
