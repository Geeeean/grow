use rocket::FromForm;
use ::serde::{Deserialize, Serialize};
use chrono::NaiveDateTime;
use domain::models::SoilTypeEnum;

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

#[derive(Debug, Serialize, Deserialize, PartialEq, Eq)]
pub struct NewVineyardTrim {
    #[serde(rename = "vineyardId")]
    pub vineyard_id: i32,
    pub date: NaiveDateTime,
}

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
}

impl VineyardResponse {
    pub fn new(
        id: i32,
        name: String,
        altitude: i32,
        soil: SoilTypeEnum,
        varieties: Vec<GrapeVarietyResponse>,
    ) -> Self {
        Self {
            id,
            name,
            altitude,
            soil,
            varieties,
        }
    }

    pub fn add_variety(&mut self, variety: GrapeVarietyResponse) {
        self.varieties.push(variety);
    }
}
