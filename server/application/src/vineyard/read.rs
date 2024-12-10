use crate::Connection;
use diesel::{prelude::*, result::Error};
use domain::models::Vineyard;
use shared::{dto::vineyard_dto::VineyardResponse, jwt::AuthenticatedUser};

pub fn read_vineyard(
    vineyard_id: i32,
    mut connection: Connection,
    user: AuthenticatedUser,
) -> Result<VineyardResponse, Error> {
    use domain::schema::vineyards::dsl::*;

    let vineyard: Vineyard = vineyards
        .filter(user_id.eq(user.id))
        .find(vineyard_id)
        .first::<Vineyard>(&mut connection)?;

    Ok(VineyardResponse::new(
        vineyard.id,
        vineyard.name,
        vineyard.altitude,
        vineyard.soil,
        Vec::new(),
    ))
}

pub fn read_vineyards(
    mut connection: Connection,
    user: AuthenticatedUser,
) -> Result<Vec<VineyardResponse>, Error> {
    use domain::schema::vineyards::dsl::*;

    let mut vineyard_reponses = Vec::new();

    for vineyard in vineyards
        .filter(user_id.eq(user.id))
        .select(Vineyard::as_select())
        .load::<Vineyard>(&mut connection)?
        .into_iter()
    {
        vineyard_reponses.push(VineyardResponse::new(
            vineyard.id,
            vineyard.name,
            vineyard.altitude,
            vineyard.soil,
            Vec::new(),
        ));
    }

    Ok(vineyard_reponses)
}
