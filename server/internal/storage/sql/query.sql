-- name: CreateUser :one

INSERT INTO users (
    name, email, password
) VALUES ($1, $2, $3)
RETURNING id, name, email;

-- name: GetUser :one
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
