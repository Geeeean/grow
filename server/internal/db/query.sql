-- name: CreateUser :one
INSERT INTO users (
    name, email, password
) VALUES ($1, $2, $3)
RETURNING id, name, email;

-- name: GetUserByEmail :one
SELECT id, name, email, password
FROM users
WHERE email = $1;

-- name: GetUserById :one
SELECT id, name, email, password
FROM users
WHERE id = $1;

-- name: CreateHarvest :one
INSERT INTO harvests (
    grape_variety, quantity_collected, quality_notes, harvest_date, user_id
) VALUES ($1, $2, $3, $4, $5)
RETURNING id, grape_variety, quantity_collected, quality_notes, harvest_date, created_at;

-- name: ListHarvests :many
SELECT id, grape_variety, quantity_collected, quality_notes, harvest_date, created_at
FROM harvests
WHERE user_id = $1;

-- name: CreateVineyard :one
INSERT INTO vineyards (
    name, altitude, soil, plants, user_id
) VALUES ($1, $2, $3, $4, $5)
RETURNING id, name, altitude, soil, plants, created_at;

-- name: CreateGrapeVariety :one
INSERT INTO grape_varieties (
    name, rows, age, user_id, vineyard_id
) VALUES ($1, $2, $3, $4, $5)
RETURNING id, name, rows, age;

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
    gv.age
FROM
    vineyards v
LEFT JOIN
    grape_varieties gv ON gv.vineyard_id = v.id
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
