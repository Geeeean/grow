use diesel::{insert_into, prelude::*, result::Error, Connection};
use domain::models::{
    ActionTypeEnum, GrapeVariety, HarvestGrapeVariety, NewGrapeVariety, NewHarvestGrapeVariety,
    NewVineyard, NewVineyardAction, NewVineyardHarvest, NewVineyardPlanting, NewVineyardTreatment,
    Vineyard, VineyardAction, VineyardHarvest, VineyardPlanting, VineyardTreatment,
};
use shared::{
    dto::vineyard_dto::{
        GrapeVarietyResponse, HarvestGrapeVarietyResponse, NewVineyardActionRequest,
        NewVineyardHarvestRequest, NewVineyardPlantingRequest, NewVineyardRequest,
        NewVineyardTreatmentRequest, VineyardActionResponse, VineyardHarvestResponse,
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
    use domain::schema::vineyards::dsl::vineyards;

    let new_vineyard = NewVineyard {
        name: vineyard_req.name,
        altitude: vineyard_req.altitude,
        plants: vineyard_req.plants,
        soil: vineyard_req.soil,
        user_id: user.id,
    };

    connection.transaction(|tx_connection| {
        let vineyard = insert_into(vineyards)
            .values(&new_vineyard)
            .get_result::<Vineyard>(tx_connection)?;

        let created_vineyard_id = vineyard.id;

        let mut vineyard_response = VineyardResponse::new(
            vineyard,
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
                vineyard_id: created_vineyard_id,
                user_id: user.id,
            };

            let variety = insert_into(grape_varieties)
                .values(&new_variety)
                .get_result::<GrapeVariety>(tx_connection)?;

            let variety_response = GrapeVarietyResponse::new(variety);

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

    Ok(VineyardActionResponse::new(vineyard_action))
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

    Ok(VineyardActionResponse::new(vineyard_action))
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
            vineyard_action_id: vineyard_action.id,
        };

        let vineyard_planting = insert_into(vineyard_plantings)
            .values(new_vineyard_planting)
            .get_result::<VineyardPlanting>(tx_connection)?;

        let vineyard_action_response = VineyardActionResponse::new(vineyard_action);

        let vineyard_planting_response =
            VineyardPlantingResponse::new(vineyard_action_response, vineyard_planting);

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
            vineyard_action_id: vineyard_action.id,
            product: treatment_req.product,
        };

        let vineyard_treatment = insert_into(vineyard_treatments)
            .values(new_vineyard_treatment)
            .get_result::<VineyardTreatment>(tx_connection)?;

        let vineyard_action_response = VineyardActionResponse::new(vineyard_action);

        let vineyard_treatment_response =
            VineyardTreatmentResponse::new(vineyard_action_response, vineyard_treatment);

        Ok(vineyard_treatment_response)
    })
}

pub fn create_harvest(
    harvest_req: NewVineyardHarvestRequest,
    connection: &mut crate::Connection,
    user: AuthenticatedUser,
) -> Result<VineyardHarvestResponse, Error> {
    use domain::schema::harvest_grape_varieties::dsl::*;
    use domain::schema::vineyard_actions::dsl::*;
    use domain::schema::vineyard_harvests::dsl::*;

    let new_action = NewVineyardAction {
        action_type: ActionTypeEnum::Harvest,
        action_date: harvest_req.action.action_date,
        vineyard_id: harvest_req.action.vineyard_id,
        user_id: user.id,
    };

    connection.transaction(|tx_connection| {
        let _ = read_vineyard(harvest_req.action.vineyard_id, tx_connection, user)?;

        let vineyard_action = insert_into(vineyard_actions)
            .values(&new_action)
            .get_result::<VineyardAction>(tx_connection)?;

        let new_vineyard_harvest = NewVineyardHarvest {
            vineyard_action_id: vineyard_action.id,
            quality_notes: harvest_req.quality_notes,
            number_of_workers: harvest_req.number_of_workers,
        };

        let vineyard_harvest = insert_into(vineyard_harvests)
            .values(new_vineyard_harvest)
            .get_result::<VineyardHarvest>(tx_connection)?;

        //TODO
        //check if harvest -> vineyard_id
        //                        ||
        //   grape_variety -> vineyard_id

        let new_harvest_grape_varieties: Vec<NewHarvestGrapeVariety> = harvest_req
            .grape_varieties
            .into_iter()
            .map(|harvest_grape_variety| NewHarvestGrapeVariety {
                harvest_id: vineyard_harvest.id,
                grape_variety_id: harvest_grape_variety.grape_variety_id,
                weight: harvest_grape_variety.weight,
            })
            .collect();

        let hv_grape_varieties: Vec<HarvestGrapeVariety> = insert_into(harvest_grape_varieties)
            .values(new_harvest_grape_varieties)
            .get_results::<HarvestGrapeVariety>(tx_connection)?;

        let vineyard_action_response = VineyardActionResponse::new(vineyard_action);

        let vineyard_harvest_response = VineyardHarvestResponse::new(
            vineyard_action_response,
            vineyard_harvest,
            hv_grape_varieties
                .into_iter()
                .map(|gv_grape_variety| HarvestGrapeVarietyResponse::new(gv_grape_variety))
                .collect(),
        );

        Ok(vineyard_harvest_response)
    })
}
