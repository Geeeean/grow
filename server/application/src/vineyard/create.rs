use diesel::{insert_into, prelude::*, result::Error, Connection};
use domain::models::{GrapeVariety, NewGrapeVariety, NewVineyard, Vineyard};
use shared::{
    dto::vineyard_dto::{GrapeVarietyResponse, NewVineyardRequest, VineyardResponse},
    jwt::AuthenticatedUser,
};

pub fn create_vineyard(
    vineyard_req: NewVineyardRequest,
    mut connection: crate::Connection,
    user: AuthenticatedUser,
) -> Result<VineyardResponse, Error> {
    use domain::schema::grape_varieties::dsl::*;
    use domain::schema::vineyards::dsl::*;

    let new_vineyard = NewVineyard {
        name: vineyard_req.name,
        altitude: vineyard_req.altitude,
        soil: vineyard_req.soil,
        user_id: user.id,
    };

    connection.transaction(|tx_connection| {
        let vineyard = insert_into(vineyards)
            .values(&new_vineyard)
            .get_result::<Vineyard>(tx_connection)?;

        let mut vineyard_response = VineyardResponse::new(
            vineyard.id,
            vineyard.name,
            vineyard.altitude,
            vineyard.soil,
            Vec::new(),
        );

        for variety_req in vineyard_req.varieties.into_iter() {
            let new_variety = NewGrapeVariety {
                name: variety_req.name,
                rows: variety_req.rows,
                age: variety_req.age,
                vineyard_id: vineyard.id,
                user_id: user.id,
            };

            let variety = insert_into(grape_varieties)
                .values(&new_variety)
                .get_result::<GrapeVariety>(tx_connection)?;

            let variety_response =
                GrapeVarietyResponse::new(variety.id, variety.name, variety.rows, variety.age);

            vineyard_response.add_variety(variety_response);
        }

        Ok(vineyard_response)
    })
}
