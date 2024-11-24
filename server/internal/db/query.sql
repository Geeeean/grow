-- name: CreateUser :one
INSERT INTO users (
    name, email, password
) VALUES ($1, $2, $3)
RETURNING id, name, email, created_at;

-- name: GetUserByEmail :one
SELECT id, name, email, password
FROM users
WHERE email = $1;

-- name: GetUserById :one
SELECT id, name, email, password
FROM users
WHERE id = $1;

-- name: CreateVineyard :one
INSERT INTO vineyards (
    name, altitude, soil, plants, user_id
) VALUES ($1, $2, $3, $4, $5)
RETURNING id, name, altitude, soil, plants, created_at;

-- name: CreateGrapeVariety :one
INSERT INTO grape_varieties (
    name, rows, age, user_id, vineyard_id
) VALUES ($1, $2, $3, $4, $5)
RETURNING id, name, rows, age, created_at;

-- name: ListVineyards :many
SELECT
    v.id AS vineyard_id,
    v.name AS vineyard_name,
    v.altitude,
    v.soil,
    v.plants,
    v.created_at,
    gv.id AS grape_variety_id,
    gv.name AS grape_variety_name,
    gv.rows,
    gv.age,
    va.id AS vineyard_action_id,
    va.action_type,
    va.action_date,
    vp.id AS vineyard_planting_id,
    vp.planting_type AS vineyard_planting_type,
    vp.plant_count
FROM
    vineyards v
LEFT JOIN
    grape_varieties gv ON gv.vineyard_id = v.id
LEFT JOIN
    vineyard_actions va ON va.vineyard_id = v.id
LEFT JOIN
    vineyard_plantings vp ON vp.action_id = va.id
WHERE
    v.user_id = $1;

-- name: GetVineyardById :one
SELECT
    v.id AS vineyard_id,
    v.name AS vineyard_name,
    v.altitude,
    v.soil,
    v.plants,
    v.created_at,
    gv.id AS grape_variety_id,
    gv.name AS grape_variety_name,
    gv.rows,
    gv.age
FROM
    vineyards v
LEFT JOIN
    grape_varieties gv ON gv.vineyard_id = v.id
WHERE
    v.id = $1 AND v.user_id = $2;

-- name: CreateVineyardAction :one
INSERT INTO vineyard_actions (
    vineyard_id, user_id, action_type, action_date
) VALUES ($1, $2, $3, $4)
RETURNING id, vineyard_id, action_type, action_date, created_at;

-- name: CreateVineyardPlanting :one
INSERT INTO vineyard_plantings (
    action_id, planting_type, plant_count
) VALUES ($1, $2, $3)
RETURNING planting_type;

-- name: CreateVineyardTreatment :one
INSERT INTO vineyard_treatments (
    action_id, product, notes
) VALUES ($1, $2)
RETURNING product, notes;
