use diesel::prelude::*;
use domain::models::Vineyard;
use infrastructure::establish_connection;
use rocket::response::status::NotFound;
use shared::response_models::Response;

pub fn read_vineyard(vineyard_id: i32) -> Result<Vineyard, NotFound<String>> {
    use domain::schema::vineyards;

    match vineyards::table
        .find(vineyard_id)
        .first::<Vineyard>(&mut establish_connection())
    {
        Ok(post) => Ok(post),
        Err(err) => match err {
            diesel::result::Error::NotFound => {
                let response = Response { body: None };
                return Err(NotFound(serde_json::to_string(&response).unwrap()));
            }
            _ => {
                panic!("Internal server error");
            }
        },
    }
}

pub fn read_vineyards() -> Vec<Vineyard> {
    use domain::schema::vineyards;

    match vineyards::table
        .select(vineyards::all_columns)
        .load::<Vineyard>(&mut establish_connection())
    {
        Ok(vineyards) => vineyards,
        Err(err) => match err {
            _ => {
                panic!("Internal server error");
            }
        },
    }
}
