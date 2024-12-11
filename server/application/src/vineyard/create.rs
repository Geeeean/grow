use diesel::{insert_into, prelude::*, result::Error, Connection};
use domain::models::{
    ActionTypeEnum, GrapeVariety, NewGrapeVariety, NewVineyard, NewVineyardAction,
    NewVineyardPlanting, NewVineyardTreatment, Vineyard, VineyardAction, VineyardPlanting,
    VineyardTreatment,
};
use shared::{
    dto::vineyard_dto::{
        GrapeVarietyResponse, NewVineyardActionRequest, NewVineyardPlantingRequest,
        NewVineyardRequest, NewVineyardTreatmentRequest, VineyardActionResponse,
        VineyardPlantingResponse, VineyardResponse, VineyardTreatmentResponse,
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

pub fn create_planting(
    planting_req: NewVineyardPlantingRequest,
    connection: &mut crate::Connection,
    user: AuthenticatedUser,
) -> Result<VineyardPlantingResponse, Error> {
    use domain::schema::vineyard_actions::dsl::*;
    use domain::schema::vineyard_plantings::dsl::*;

    let new_action = NewVineyardAction {
        action_type: ActionTypeEnum::Planting,
        action_date: planting_req.action.action_date,
        vineyard_id: planting_req.action.vineyard_id,
        user_id: user.id,
    };

    connection.transaction(|tx_connection| {
        let _ = read_vineyard(planting_req.action.vineyard_id, tx_connection, user)?;

        let vineyard_action = insert_into(vineyard_actions)
            .values(&new_action)
            .get_result::<VineyardAction>(tx_connection)?;

        let new_vineyard_planting = NewVineyardPlanting {
            plant_count: planting_req.plant_count,
            planting_type: planting_req.planting_type,
        };

        let vineyard_planting = insert_into(vineyard_plantings)
            .values(new_vineyard_planting)
            .get_result::<VineyardPlanting>(tx_connection)?;

        let vineyard_action_response = VineyardActionResponse::new(
            vineyard_action.id,
            vineyard_action.vineyard_id,
            vineyard_action.action_type,
            vineyard_action.action_date,
        );

        let vineyard_planting_response = VineyardPlantingResponse::new(
            vineyard_action_response,
            vineyard_planting.id,
            vineyard_planting.planting_type,
            vineyard_planting.plant_count,
        );

        Ok(vineyard_planting_response)
    })
}

pub fn create_treatment(
    treatment_req: NewVineyardTreatmentRequest,
    connection: &mut crate::Connection,
    user: AuthenticatedUser,
) -> Result<VineyardTreatmentResponse, Error> {
    use domain::schema::vineyard_actions::dsl::*;
    use domain::schema::vineyard_treatments::dsl::*;

    let new_action = NewVineyardAction {
        action_type: ActionTypeEnum::Treatment,
        action_date: treatment_req.action.action_date,
        vineyard_id: treatment_req.action.vineyard_id,
        user_id: user.id,
    };

    connection.transaction(|tx_connection| {
        let _ = read_vineyard(treatment_req.action.vineyard_id, tx_connection, user)?;

        let vineyard_action = insert_into(vineyard_actions)
            .values(&new_action)
            .get_result::<VineyardAction>(tx_connection)?;

        let new_vineyard_treatment = NewVineyardTreatment {
            treatment_type: treatment_req.treatment_type,
            product: treatment_req.product,
        };

        let vineyard_treatment = insert_into(vineyard_treatments)
            .values(new_vineyard_treatment)
            .get_result::<VineyardTreatment>(tx_connection)?;

        let vineyard_action_response = VineyardActionResponse::new(
            vineyard_action.id,
            vineyard_action.vineyard_id,
            vineyard_action.action_type,
            vineyard_action.action_date,
        );

        let vineyard_treatment_response = VineyardTreatmentResponse::new(
            vineyard_action_response,
            vineyard_treatment.id,
            vineyard_treatment.treatment_type,
            vineyard_treatment.product,
        );

        Ok(vineyard_treatment_response)
    })
}
