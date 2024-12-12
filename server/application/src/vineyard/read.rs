use std::collections::HashMap;

use crate::Connection;
use diesel::{prelude::*, result::Error};
use domain::models::{
    ActionTypeEnum, GrapeVariety, Vineyard, VineyardAction, VineyardPlanting, VineyardTreatment,
};
use shared::{
    dto::vineyard_dto::{
        GrapeVarietyResponse, VineyardActionResponse, VineyardPlantingResponse, VineyardResponse,
        VineyardTreatmentResponse,
    },
    jwt::AuthenticatedUser,
};

pub fn read_vineyard(
    vineyard_id: i32,
    connection: &mut Connection,
    user: AuthenticatedUser,
) -> Result<VineyardResponse, Error> {
    use domain::schema::grape_varieties::dsl::{grape_varieties, vineyard_id as vy_id};
    use domain::schema::vineyards::dsl::{user_id, vineyards};

    let vineyard: Vineyard = vineyards
        .filter(user_id.eq(user.id))
        .find(vineyard_id)
        .first::<Vineyard>(connection)?;

    let grape_vars: Vec<GrapeVariety> = grape_varieties
        .filter(vy_id.eq(vineyard.id))
        .load::<GrapeVariety>(connection)?;

    let grape_vars_response: Vec<GrapeVarietyResponse> = grape_vars
        .into_iter()
        .map(|gv| GrapeVarietyResponse::new(gv.id, gv.name, gv.rows, gv.age))
        .collect();

    Ok(VineyardResponse::new(
        vineyard.id,
        vineyard.name,
        vineyard.altitude,
        vineyard.plants,
        vineyard.soil,
        grape_vars_response,
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
    use domain::schema::grape_varieties::dsl::user_id as gv_user_id;
    use domain::schema::vineyard_actions::dsl::user_id as va_user_id;
    use domain::schema::vineyards::dsl::{user_id, vineyards};

    /*** VINEYARDS ***/
    let vineyards_res: Vec<Vineyard> = vineyards
        .filter(user_id.eq(user.id))
        .load::<Vineyard>(connection)?;

    /*** GRAPE VARIETIES ***/
    let grape_vars: Vec<GrapeVariety> = GrapeVariety::belonging_to(&vineyards_res)
        .filter(gv_user_id.eq(user.id))
        .load::<GrapeVariety>(connection)?;
    let grape_vars_per_vineyard = grape_vars.grouped_by(&vineyards_res);

    /*** ACTIONS ***/
    let actions: Vec<VineyardAction> = VineyardAction::belonging_to(&vineyards_res)
        .filter(va_user_id.eq(user.id))
        .load::<VineyardAction>(connection)?;

    /*** PLANTINGS ***/
    let plantings: Vec<VineyardPlanting> =
        VineyardPlanting::belonging_to(&actions).load::<VineyardPlanting>(connection)?;
    let mut plantings_map: HashMap<i32, VineyardPlanting> = HashMap::new();
    for planting in plantings.into_iter() {
        plantings_map.insert(planting.vineyard_action_id, planting);
    }

    /*** TREATMENTS ***/
    let treatments: Vec<VineyardTreatment> =
        VineyardTreatment::belonging_to(&actions).load::<VineyardTreatment>(connection)?;
    let mut treatments_map: HashMap<i32, VineyardTreatment> = HashMap::new();
    for treatment in treatments.into_iter() {
        treatments_map.insert(treatment.vineyard_action_id, treatment);
    }

    let actions_per_vineyard = actions.grouped_by(&vineyards_res);

    let vineyard_responses = vineyards_res
        .into_iter()
        .zip(grape_vars_per_vineyard)
        .zip(actions_per_vineyard)
        .map(|((vineyard, varieties), actions)| {
            let mut planting_responses: Vec<VineyardPlantingResponse> = Vec::new();
            let mut treatment_responses: Vec<VineyardTreatmentResponse> = Vec::new();
            let mut cut_responses: Vec<VineyardActionResponse> = Vec::new();
            let mut trim_responses: Vec<VineyardActionResponse> = Vec::new();

            for action in actions.into_iter() {
                let action_response = VineyardActionResponse::new(
                    action.id,
                    action.vineyard_id,
                    action.action_type.clone(),
                    action.action_date,
                );

                match action.action_type {
                    ActionTypeEnum::Trim => trim_responses.push(action_response),
                    ActionTypeEnum::Cut => cut_responses.push(action_response),
                    ActionTypeEnum::Planting => {
                        let planting = match plantings_map.remove(&action.id) {
                            Some(planting) => planting,
                            None => todo!(),
                        };

                        planting_responses.push(VineyardPlantingResponse::new(
                            action_response,
                            planting.id,
                            planting.planting_type,
                            planting.plant_count,
                        ));
                    }
                    ActionTypeEnum::Treatment => {
                        let treatment = match treatments_map.remove(&action.id) {
                            Some(treatment) => treatment,
                            None => todo!(),
                        };

                        treatment_responses.push(VineyardTreatmentResponse::new(
                            action_response,
                            treatment.id,
                            treatment.treatment_type,
                            treatment.product,
                        ));
                    }
                    ActionTypeEnum::Harvest => todo!(),
                };
            }

            VineyardResponse::new(
                vineyard.id,
                vineyard.name,
                vineyard.altitude,
                vineyard.plants,
                vineyard.soil,
                varieties
                    .into_iter()
                    .map(|variety| {
                        GrapeVarietyResponse::new(
                            variety.id,
                            variety.name,
                            variety.rows,
                            variety.age,
                        )
                    })
                    .collect(),
                trim_responses,
                cut_responses,
                planting_responses,
                treatment_responses,
                Vec::new(),
            )
        })
        .collect();

    Ok(vineyard_responses)
}
