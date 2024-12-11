#[macro_use]
extern crate rocket;
use std::env;

use api::handler::{
    auth_handler::{signin, signup},
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
use rocket::http::Method;
use rocket_cors::{AllowedHeaders, AllowedOrigins, Cors, CorsOptions};

fn make_cors() -> Cors {
    let allowed_origins = AllowedOrigins::all();

    CorsOptions {
        allowed_origins,
        allowed_methods: vec![Method::Get, Method::Post, Method::Options]
            .into_iter()
            .map(From::from)
            .collect(),
        allowed_headers: AllowedHeaders::some(&["Authorization", "Accept", "Content-Type"]),
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors()
    .expect("To not fail")
}

#[launch]
fn rocket() -> _ {
    dotenv().ok();
    let port = env::var("PORT").expect("PORT must be set");
    let port = port.parse::<u16>().expect("PORT must be u16");

    let server_state = ServerState::new();

    rocket::build()
        .configure(rocket::Config::figment().merge(("port", port)))
        .manage(server_state)
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
            ],
        )
        .mount("/api/auth", routes![signup, signin])
        .mount("/api/user", routes![get_user])
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
        .attach(make_cors())
}
