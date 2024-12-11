use crate::Connection;
use diesel::{prelude::*, result::Error};
use domain::models::Vineyard;
use shared::{dto::vineyard_dto::VineyardResponse, jwt::AuthenticatedUser};

pub fn read_vineyard(
    vineyard_id: i32,
    connection: &mut Connection,
    user: AuthenticatedUser,
) -> Result<VineyardResponse, Error> {
    use domain::schema::vineyards::dsl::*;

    let vineyard: Vineyard = vineyards
        .filter(user_id.eq(user.id))
        .find(vineyard_id)
        .first::<Vineyard>(connection)?;

    Ok(VineyardResponse::new(
        vineyard.id,
        vineyard.name,
        vineyard.altitude,
        vineyard.soil,
        Vec::new(),
        Vec::new(),
        Vec::new(),
        Vec::new(),
        Vec::new(),
        Vec::new(),
    ))
}

pub fn read_vineyards(
    connection: &mut Connection,
    user: AuthenticatedUser,
) -> Result<Vec<VineyardResponse>, Error> {
    use domain::schema::vineyards::dsl::*;

    let mut vineyard_reponses = Vec::new();

    for vineyard in vineyards
        .filter(user_id.eq(user.id))
        .select(Vineyard::as_select())
        .load::<Vineyard>(connection)?
        .into_iter()
    {
        vineyard_reponses.push(VineyardResponse::new(
            vineyard.id,
            vineyard.name,
            vineyard.altitude,
            vineyard.soil,
            Vec::new(),
            Vec::new(),
            Vec::new(),
            Vec::new(),
            Vec::new(),
            Vec::new(),
        ));
    }

    Ok(vineyard_reponses)
}
