use ::serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};
use domain::models::{
    ActionTypeEnum, GrapeVariety, HarvestGrapeVariety, PlantingTypeEnum, SoilTypeEnum,
    TreatmentTypeEnum, Vineyard, VineyardAction, VineyardHarvest, VineyardPlanting,
    VineyardTreatment,
};
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
    pub fn new(grape_variety: GrapeVariety) -> Self {
        Self {
            id: grape_variety.id,
            name: grape_variety.name,
            rows: grape_variety.rows,
            age: grape_variety.age,
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
    pub fn new(vineyard_action: VineyardAction) -> Self {
        Self {
            id: vineyard_action.id,
            vineyard_id: vineyard_action.vineyard_id,
            action_type: vineyard_action.action_type,
            action_date: vineyard_action.action_date,
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
    pub fn new(action: VineyardActionResponse, planting: VineyardPlanting) -> Self {
        Self {
            action,
            id: planting.id,
            planting_type: planting.planting_type,
            plant_count: planting.plant_count,
        }
    }
}

/*** TREATMENT ***/
#[derive(Debug, Serialize, Deserialize, PartialEq, Eq)]
pub struct NewVineyardTreatmentRequest {
    pub action: NewVineyardActionRequest,
    pub product: String,

    #[serde(rename = "treatmentType")]
    pub treatment_type: TreatmentTypeEnum,
}

#[derive(Serialize)]
pub struct VineyardTreatmentResponse {
    action: VineyardActionResponse,
    id: i32,
    product: String,

    #[serde(rename = "treatmentType")]
    treatment_type: TreatmentTypeEnum,
}

impl VineyardTreatmentResponse {
    pub fn new(action: VineyardActionResponse, treatment: VineyardTreatment) -> Self {
        Self {
            action,
            id: treatment.id,
            treatment_type: treatment.treatment_type,
            product: treatment.product,
        }
    }
}

/*** HARVEST ***/
#[derive(Debug, Serialize, Deserialize, PartialEq, Eq)]
pub struct NewHarvestGrapeVarietyRequest {
    pub weight: i32,

    #[serde(rename = "grapeVarietyId")]
    pub grape_variety_id: i32,
}

#[derive(Serialize)]
pub struct HarvestGrapeVarietyResponse {
    id: i32,
    weight: i32,

    #[serde(rename = "grapeVarietyId")]
    grape_variety_id: i32,
}

impl HarvestGrapeVarietyResponse {
    pub fn new(harvest_grape_variety: HarvestGrapeVariety) -> Self {
        Self {
            id: harvest_grape_variety.id,
            weight: harvest_grape_variety.weight,
            grape_variety_id: harvest_grape_variety.grape_variety_id,
        }
    }
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Eq)]
pub struct NewVineyardHarvestRequest {
    pub action: NewVineyardActionRequest,

    #[serde(rename = "qualityNotes")]
    pub quality_notes: String,

    #[serde(rename = "numberOfWorkers")]
    pub number_of_workers: i32,

    #[serde(rename = "varieties")]
    pub grape_varieties: Vec<NewHarvestGrapeVarietyRequest>,
}

#[derive(Serialize)]
pub struct VineyardHarvestResponse {
    action: VineyardActionResponse,
    id: i32,

    #[serde(rename = "qualityNotes")]
    quality_notes: String,

    #[serde(rename = "numberOfWorkers")]
    number_of_workers: i32,

    #[serde(rename = "grapeVarietyIds")]
    grape_varieties: Vec<HarvestGrapeVarietyResponse>,
}

impl VineyardHarvestResponse {
    pub fn new(
        action: VineyardActionResponse,
        vineyard_harvest: VineyardHarvest,
        grape_varieties: Vec<HarvestGrapeVarietyResponse>,
    ) -> Self {
        Self {
            action,
            id: vineyard_harvest.id,
            quality_notes: vineyard_harvest.quality_notes,
            number_of_workers: vineyard_harvest.number_of_workers,
            grape_varieties,
        }
    }
}

/*** VINEYARD ***/
#[derive(Debug, Serialize, Deserialize, PartialEq, Eq, FromForm)]
pub struct NewVineyardRequest {
    pub name: String,
    pub altitude: i32,
    pub plants: i32,
    pub soil: SoilTypeEnum,
    pub varieties: Vec<NewGrapeVarietyRequest>,
}

#[derive(Serialize)]
pub struct VineyardResponse {
    id: i32,
    name: String,
    altitude: i32,
    plants: i32,
    soil: SoilTypeEnum,
    varieties: Vec<GrapeVarietyResponse>,
    trims: Vec<VineyardActionResponse>,
    cuts: Vec<VineyardActionResponse>,
    plantings: Vec<VineyardPlantingResponse>,
    treatments: Vec<VineyardTreatmentResponse>,
    harvests: Vec<VineyardActionResponse>,
}

impl VineyardResponse {
    pub fn new(
        vineyard: Vineyard,
        varieties: Vec<GrapeVarietyResponse>,
        trims: Vec<VineyardActionResponse>,
        cuts: Vec<VineyardActionResponse>,
        plantings: Vec<VineyardPlantingResponse>,
        treatments: Vec<VineyardTreatmentResponse>,
        harvests: Vec<VineyardActionResponse>,
    ) -> Self {
        Self {
            id: vineyard.id,
            name: vineyard.name,
            altitude: vineyard.altitude,
            plants: vineyard.plants,
            soil: vineyard.soil,
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
