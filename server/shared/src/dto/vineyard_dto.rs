use ::serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};
use domain::models::{ActionTypeEnum, PlantingTypeEnum, SoilTypeEnum, TreatmentTypeEnum};
use rocket::FromForm;

/*** VARIETY ***/
#[derive(Debug, Serialize, Deserialize, PartialEq, Eq, FromForm)]
pub struct NewGrapeVarietyRequest {
    pub name: String,
    pub rows: i32,
    pub age: i32,
}

#[derive(Serialize)]
pub struct GrapeVarietyResponse {
    id: i32,
    name: String,
    rows: i32,
    age: i32,
}

impl GrapeVarietyResponse {
    pub fn new(id: i32, name: String, rows: i32, age: i32) -> Self {
        Self {
            id,
            name,
            rows,
            age,
        }
    }
}

/*** BASE ACTION ***/
#[derive(Debug, Serialize, Deserialize, PartialEq, Eq)]
pub struct NewVineyardActionRequest {
    #[serde(rename = "vineyardId")]
    pub vineyard_id: i32,
    #[serde(rename = "date")]
    pub action_date: DateTime<Utc>,
}

#[derive(Serialize)]
pub struct VineyardActionResponse {
    id: i32,
    #[serde(rename = "vineyardId")]
    vineyard_id: i32,
    #[serde(rename = "actionType")]
    action_type: ActionTypeEnum,
    #[serde(rename = "date")]
    action_date: DateTime<Utc>,
}

impl VineyardActionResponse {
    pub fn new(
        id: i32,
        vineyard_id: i32,
        action_type: ActionTypeEnum,
        action_date: DateTime<Utc>,
    ) -> Self {
        Self {
            id,
            vineyard_id,
            action_type,
            action_date,
        }
    }
}

/*** PLANTING  ***/
#[derive(Debug, Serialize, Deserialize, PartialEq, Eq)]
pub struct NewVineyardPlantingRequest {
    pub action: NewVineyardActionRequest,
    #[serde(rename = "plantingType")]
    pub planting_type: PlantingTypeEnum,
    #[serde(rename = "plantCount")]
    pub plant_count: i32,
}

#[derive(Serialize)]
pub struct VineyardPlantingResponse {
    action: VineyardActionResponse,
    id: i32,
    #[serde(rename = "plantingType")]
    planting_type: PlantingTypeEnum,
    #[serde(rename = "plantCount")]
    plant_count: i32,
}

impl VineyardPlantingResponse {
    pub fn new(
        action: VineyardActionResponse,
        id: i32,
        planting_type: PlantingTypeEnum,
        plant_count: i32,
    ) -> Self {
        Self {
            action,
            id,
            planting_type,
            plant_count,
        }
    }
}

/*** TREATMENT ***/
#[derive(Debug, Serialize, Deserialize, PartialEq, Eq)]
pub struct NewVineyardTreatmentRequest {
    pub action: NewVineyardActionRequest,
    #[serde(rename = "treatmentType")]
    pub treatment_type: TreatmentTypeEnum,
    pub product: String,
}

#[derive(Serialize)]
pub struct VineyardTreatmentResponse {
    action: VineyardActionResponse,
    id: i32,
    #[serde(rename = "treatmentType")]
    treatment_type: TreatmentTypeEnum,
    product: String,
}

impl VineyardTreatmentResponse {
    pub fn new(
        action: VineyardActionResponse,
        id: i32,
        treatment_type: TreatmentTypeEnum,
        product: String,
    ) -> Self {
        Self {
            action,
            id,
            treatment_type,
            product,
        }
    }
}

/*** HARVEST ***/
/*
#[derive(Debug, Serialize, Deserialize, PartialEq, Eq)]
pub struct NewVineyardHarvest {
    pub action: NewVineyardActionRequest,
}

#[derive(Serialize)]
pub struct VineyardHarvestResponse {
    action: VineyardActionResponse,
    id: i32,
}

impl VineyardHarvestResponse {
    pub fn new(action: VineyardActionResponse, id: i32) -> Self {
        Self { action, id }
    }
}
*/

/*** VINEYARD ***/
#[derive(Debug, Serialize, Deserialize, PartialEq, Eq, FromForm)]
pub struct NewVineyardRequest {
    pub name: String,
    pub altitude: i32,
    pub soil: SoilTypeEnum,
    pub varieties: Vec<NewGrapeVarietyRequest>,
}

#[derive(Serialize)]
pub struct VineyardResponse {
    id: i32,
    name: String,
    altitude: i32,
    soil: SoilTypeEnum,
    varieties: Vec<GrapeVarietyResponse>,
    trims: Vec<VineyardActionResponse>,
    cuts: Vec<VineyardActionResponse>,
    plantings: Vec<VineyardActionResponse>,
    treatments: Vec<VineyardActionResponse>,
    harvests: Vec<VineyardActionResponse>,
}

impl VineyardResponse {
    pub fn new(
        id: i32,
        name: String,
        altitude: i32,
        soil: SoilTypeEnum,
        varieties: Vec<GrapeVarietyResponse>,
        trims: Vec<VineyardActionResponse>,
        cuts: Vec<VineyardActionResponse>,
        plantings: Vec<VineyardActionResponse>,
        treatments: Vec<VineyardActionResponse>,
        harvests: Vec<VineyardActionResponse>,
    ) -> Self {
        Self {
            id,
            name,
            altitude,
            soil,
            varieties,
            trims,
            cuts,
            plantings,
            treatments,
            harvests,
        }
    }

    pub fn add_variety(&mut self, variety: GrapeVarietyResponse) {
        self.varieties.push(variety);
    }
}
