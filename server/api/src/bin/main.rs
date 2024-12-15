#[macro_use]
extern crate rocket;
use std::env;

use api::handler::{
    auth_handler::{signin, signout, signup},
    cors_handler::{all_options, make_cors},
    error_handler::{
        bad_request, forbidden, internal_error, not_found, unauthorized, unprocessable_entity,
    },
    user_handler::get_user,
    vineyard_handler::{
        get_vineyard, get_vineyards, new_vineyard, new_vineyard_cut, new_vineyard_planting,
        new_vineyard_treatment, new_vineyard_trim,
    },
};
use dotenvy::dotenv;
use infrastructure::ServerState;

#[launch]
fn rocket() -> _ {
    dotenv().ok();
    let port = env::var("PORT").expect("PORT must be set");
    let port = port.parse::<u16>().expect("PORT must be u16");

    let server_state = ServerState::new();

    rocket::build()
        .configure(rocket::Config::figment().merge(("port", port)))
        .manage(server_state)
        .attach(make_cors())
        .mount(
            "/api/vineyard",
            routes![
                get_vineyards,
                get_vineyard,
                new_vineyard,
                new_vineyard_trim,
                new_vineyard_cut,
                new_vineyard_treatment,
                new_vineyard_planting,
                all_options
            ],
        )
        .mount("/api/auth", routes![signup, signin, signout, all_options])
        .mount("/api/user", routes![get_user, all_options])
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
