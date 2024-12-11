use ::serde::{Deserialize, Serialize};
use chrono::NaiveDateTime;
use domain::models::{ActionTypeEnum, SoilTypeEnum};
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
    pub action_date: NaiveDateTime,
}

#[derive(Serialize)]
pub struct VineyardActionResponse {
    id: i32,
    vineyard_id: i32,
    action_type: ActionTypeEnum,
    action_date: NaiveDateTime,
}
impl VineyardActionResponse {
    pub fn new(
        id: i32,
        vineyard_id: i32,
        action_type: ActionTypeEnum,
        action_date: NaiveDateTime,
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
pub struct NewVineyardPlanting {
    field1: i32,
    action : NewVineyardActionRequest
}


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
