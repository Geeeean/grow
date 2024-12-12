use rocket::{http::Method, options};
use rocket_cors::{AllowedHeaders, AllowedOrigins, Cors, CorsOptions};

#[options("/<_..>")]
pub fn all_options() {}

pub fn make_cors() -> Cors {
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
