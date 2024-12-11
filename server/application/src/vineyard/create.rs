use diesel::{insert_into, prelude::*, result::Error, Connection};
use domain::models::{
    ActionTypeEnum, GrapeVariety, NewGrapeVariety, NewVineyard, NewVineyardAction, Vineyard,
    VineyardAction,
};
use shared::{
    dto::vineyard_dto::{
        GrapeVarietyResponse, NewVineyardActionRequest, NewVineyardRequest, VineyardActionResponse,
        VineyardResponse,
    },
    jwt::AuthenticatedUser,
};

use crate::vineyard::read::read_vineyard;

pub fn create_vineyard(
    vineyard_req: NewVineyardRequest,
    connection: &mut crate::Connection,
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
            Vec::new(),
            Vec::new(),
            Vec::new(),
            Vec::new(),
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

pub fn create_trim(
    trim_req: NewVineyardActionRequest,
    connection: &mut crate::Connection,
    user: AuthenticatedUser,
) -> Result<VineyardActionResponse, Error> {
    use domain::schema::vineyard_actions::dsl::*;

    let new_trim = NewVineyardAction {
        action_type: ActionTypeEnum::Trim,
        action_date: trim_req.action_date,
        vineyard_id: trim_req.vineyard_id,
        user_id: user.id,
    };

    let _ = read_vineyard(trim_req.vineyard_id, connection, user)?;

    let vineyard_action = insert_into(vineyard_actions)
        .values(&new_trim)
        .get_result::<VineyardAction>(connection)?;

    Ok(VineyardActionResponse::new(
        vineyard_action.id,
        vineyard_action.vineyard_id,
        vineyard_action.action_type,
        vineyard_action.action_date,
    ))
}

pub fn create_cut(
    cut_req: NewVineyardActionRequest,
    connection: &mut crate::Connection,
    user: AuthenticatedUser,
) -> Result<VineyardActionResponse, Error> {
    use domain::schema::vineyard_actions::dsl::*;

    let new_cut = NewVineyardAction {
        action_type: ActionTypeEnum::Cut,
        action_date: cut_req.action_date,
        vineyard_id: cut_req.vineyard_id,
        user_id: user.id,
    };

    let _ = read_vineyard(cut_req.vineyard_id, connection, user)?;

    let vineyard_action = insert_into(vineyard_actions)
        .values(&new_cut)
        .get_result::<VineyardAction>(connection)?;

    Ok(VineyardActionResponse::new(
        vineyard_action.id,
        vineyard_action.vineyard_id,
        vineyard_action.action_type,
        vineyard_action.action_date,
    ))
}
