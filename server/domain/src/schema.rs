// @generated automatically by Diesel CLI.

pub mod sql_types {
    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "action_type"))]
    pub struct ActionType;

    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "planting_type"))]
    pub struct PlantingType;

    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "soil_type"))]
    pub struct SoilType;

    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "treatment_type"))]
    pub struct TreatmentType;
}

diesel::table! {
    grape_varieties (id) {
        id -> Int4,
        name -> Text,
        rows -> Int4,
        age -> Int4,
        vineyard_id -> Int4,
        created_at -> Timestamptz,
        user_id -> Uuid,
    }
}

diesel::table! {
    harvest_grape_varieties (id) {
        id -> Int4,
        harvest_id -> Int4,
        grape_variety_id -> Int4,
        weight -> Int4,
        created_at -> Timestamptz,
    }
}

diesel::table! {
    users (id) {
        id -> Uuid,
        name -> Text,
        email -> Text,
        password -> Text,
        created_at -> Timestamptz,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::ActionType;

    vineyard_actions (id) {
        id -> Int4,
        vineyard_id -> Int4,
        user_id -> Uuid,
        action_type -> ActionType,
        action_date -> Timestamptz,
        created_at -> Timestamptz,
    }
}

diesel::table! {
    vineyard_harvests (id) {
        id -> Int4,
        vineyard_action_id -> Int4,
        quality_notes -> Text,
        number_of_workers -> Int4,
        created_at -> Timestamptz,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::PlantingType;

    vineyard_plantings (id) {
        id -> Int4,
        vineyard_action_id -> Int4,
        planting_type -> PlantingType,
        plant_count -> Int4,
        created_at -> Timestamptz,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::TreatmentType;

    vineyard_treatments (id) {
        id -> Int4,
        vineyard_action_id -> Int4,
        treatment_type -> TreatmentType,
        product -> Text,
        created_at -> Timestamptz,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::SoilType;

    vineyards (id) {
        id -> Int4,
        name -> Text,
        altitude -> Int4,
        plants -> Int4,
        soil -> SoilType,
        user_id -> Uuid,
        created_at -> Timestamptz,
    }
}

diesel::joinable!(grape_varieties -> users (user_id));
diesel::joinable!(grape_varieties -> vineyards (vineyard_id));
diesel::joinable!(harvest_grape_varieties -> grape_varieties (grape_variety_id));
diesel::joinable!(harvest_grape_varieties -> vineyard_harvests (harvest_id));
diesel::joinable!(vineyard_actions -> users (user_id));
diesel::joinable!(vineyard_actions -> vineyards (vineyard_id));
diesel::joinable!(vineyard_harvests -> vineyard_actions (vineyard_action_id));
diesel::joinable!(vineyard_plantings -> vineyard_actions (vineyard_action_id));
diesel::joinable!(vineyard_treatments -> vineyard_actions (vineyard_action_id));
diesel::joinable!(vineyards -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(
    grape_varieties,
    harvest_grape_varieties,
    users,
    vineyard_actions,
    vineyard_harvests,
    vineyard_plantings,
    vineyard_treatments,
    vineyards,
);
