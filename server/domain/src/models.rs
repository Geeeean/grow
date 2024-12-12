use crate::schema::sql_types::{ActionType, PlantingType, SoilType, TreatmentType};
use crate::schema::{
    grape_varieties, users, vineyard_actions, vineyard_plantings, vineyard_treatments, vineyards,
};
use chrono::{DateTime, Utc};
use diesel::prelude::*;
use diesel_derive_enum::DbEnum;
use rocket::serde::{Deserialize, Serialize};
use rocket::FromFormField;
use uuid::Uuid;

#[derive(Debug, Deserialize, Serialize, DbEnum, PartialEq, Eq, FromFormField)]
#[ExistingTypePath = "SoilType"]
pub enum SoilTypeEnum {
    Calcareous,
    Clay,
    Sandy,
    Gravelly,
    Volcanic,
    Schist,
    Silty,
    Alluvial,
}

#[derive(Debug, Deserialize, Serialize, DbEnum, PartialEq, Eq, FromFormField, Clone)]
#[ExistingTypePath = "ActionType"]
pub enum ActionTypeEnum {
    Trim,
    Cut,
    Planting,
    Treatment,
    Harvest,
}

#[derive(Debug, Deserialize, Serialize, DbEnum, PartialEq, Eq, FromFormField)]
#[ExistingTypePath = "TreatmentType"]
pub enum TreatmentTypeEnum {
    Fungicide,
    Pesticide,
    Fertilizer,
    Irrigation,
}

#[derive(Debug, Deserialize, Serialize, DbEnum, PartialEq, Eq, FromFormField)]
#[ExistingTypePath = "PlantingType"]
pub enum PlantingTypeEnum {
    Removal,
    Planting,
}

#[derive(Queryable, Identifiable, Debug, Serialize, Deserialize)]
#[diesel(table_name = users)]
pub struct User {
    pub id: Uuid,
    pub name: String,
    pub email: String,
    pub password: String,
    pub created_at: DateTime<Utc>,
}

#[derive(Insertable, Debug, Serialize, Deserialize)]
#[diesel(table_name = users)]
pub struct NewUser {
    pub name: String,
    pub email: String,
    pub password: String,
}

#[derive(
    Queryable,
    QueryableByName,
    Selectable,
    Identifiable,
    Associations,
    Debug,
    Serialize,
    Deserialize,
)]
#[diesel(belongs_to(User))]
#[diesel(table_name = vineyards)]
pub struct Vineyard {
    pub id: i32,
    pub name: String,
    pub altitude: i32,
    pub plants: i32,
    pub soil: SoilTypeEnum,
    pub user_id: Uuid,
    pub created_at: DateTime<Utc>,
}

#[derive(Insertable, Deserialize)]
#[serde(crate = "rocket::serde")]
#[diesel(table_name = vineyards)]
pub struct NewVineyard {
    pub name: String,
    pub altitude: i32,
    pub plants: i32,
    pub soil: SoilTypeEnum,
    pub user_id: Uuid,
}

#[derive(Queryable, Identifiable, Associations, Debug, Serialize, Deserialize)]
#[diesel(belongs_to(User))]
#[diesel(belongs_to(Vineyard, foreign_key = vineyard_id))]
#[diesel(table_name = grape_varieties)]
pub struct GrapeVariety {
    pub id: i32,
    pub name: String,
    pub rows: i32,
    pub age: i32,
    pub vineyard_id: i32,
    pub created_at: DateTime<Utc>,
    pub user_id: Uuid,
}

#[derive(Insertable, Deserialize)]
#[serde(crate = "rocket::serde")]
#[diesel(table_name = grape_varieties )]
pub struct NewGrapeVariety {
    pub name: String,
    pub rows: i32,
    pub age: i32,
    pub vineyard_id: i32,
    pub user_id: Uuid,
}

#[derive(Queryable, Identifiable, Associations, Debug, Serialize, Deserialize)]
#[diesel(belongs_to(User))]
#[diesel(belongs_to(Vineyard, foreign_key = vineyard_id))]
#[diesel(table_name = vineyard_actions)]
pub struct VineyardAction {
    pub id: i32,
    pub vineyard_id: i32,
    pub user_id: Uuid,
    pub action_type: ActionTypeEnum,
    pub action_date: DateTime<Utc>,
    pub created_at: DateTime<Utc>,
}

#[derive(Insertable, Deserialize)]
#[serde(crate = "rocket::serde")]
#[diesel(table_name = vineyard_actions)]
pub struct NewVineyardAction {
    pub vineyard_id: i32,
    pub user_id: Uuid,
    pub action_type: ActionTypeEnum,
    pub action_date: DateTime<Utc>,
}

#[derive(Queryable, Identifiable, Associations, Debug, Serialize, Deserialize)]
#[diesel(belongs_to(VineyardAction, foreign_key = vineyard_action_id))]
#[diesel(table_name = vineyard_plantings)]
pub struct VineyardPlanting {
    pub id: i32,
    pub vineyard_action_id: i32,
    pub planting_type: PlantingTypeEnum,
    pub plant_count: i32,
    pub created_at: DateTime<Utc>,
}

#[derive(Insertable, Deserialize)]
#[serde(crate = "rocket::serde")]
#[diesel(table_name = vineyard_plantings)]
pub struct NewVineyardPlanting {
    pub planting_type: PlantingTypeEnum,
    pub plant_count: i32,
}

#[derive(Queryable, Identifiable, Associations, Debug, Serialize, Deserialize)]
#[diesel(belongs_to(VineyardAction, foreign_key = vineyard_action_id))]
#[diesel(table_name = vineyard_treatments)]
pub struct VineyardTreatment {
    pub id: i32,
    pub vineyard_action_id: i32,
    pub treatment_type: TreatmentTypeEnum,
    pub product: String,
    pub created_at: DateTime<Utc>,
}

#[derive(Insertable, Deserialize)]
#[serde(crate = "rocket::serde")]
#[diesel(table_name = vineyard_treatments)]
pub struct NewVineyardTreatment {
    pub treatment_type: TreatmentTypeEnum,
    pub product: String,
}
