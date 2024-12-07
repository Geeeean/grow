// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: query.sql

package storage

import (
	"context"
	"database/sql"
	"time"

	"github.com/google/uuid"
)

const createGrapeVariety = `-- name: CreateGrapeVariety :one
INSERT INTO grape_varieties (
    name, rows, age, user_id, vineyard_id
) VALUES ($1, $2, $3, $4, $5)
RETURNING id, name, rows, age, created_at
`

type CreateGrapeVarietyParams struct {
	Name       string
	Rows       int32
	Age        int32
	UserID     uuid.UUID
	VineyardID int32
}

type CreateGrapeVarietyRow struct {
	ID        int32
	Name      string
	Rows      int32
	Age       int32
	CreatedAt time.Time
}

func (q *Queries) CreateGrapeVariety(ctx context.Context, arg CreateGrapeVarietyParams) (CreateGrapeVarietyRow, error) {
	row := q.db.QueryRowContext(ctx, createGrapeVariety,
		arg.Name,
		arg.Rows,
		arg.Age,
		arg.UserID,
		arg.VineyardID,
	)
	var i CreateGrapeVarietyRow
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Rows,
		&i.Age,
		&i.CreatedAt,
	)
	return i, err
}

const createUser = `-- name: CreateUser :one
INSERT INTO users (
    name, email, password
) VALUES ($1, $2, $3)
RETURNING id, name, email, created_at
`

type CreateUserParams struct {
	Name     string
	Email    string
	Password string
}

type CreateUserRow struct {
	ID        uuid.UUID
	Name      string
	Email     string
	CreatedAt time.Time
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (CreateUserRow, error) {
	row := q.db.QueryRowContext(ctx, createUser, arg.Name, arg.Email, arg.Password)
	var i CreateUserRow
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Email,
		&i.CreatedAt,
	)
	return i, err
}

const createVineyard = `-- name: CreateVineyard :one
INSERT INTO vineyards (
    name, altitude, soil, plants, user_id
) VALUES ($1, $2, $3, $4, $5)
RETURNING id, name, altitude, soil, plants, created_at
`

type CreateVineyardParams struct {
	Name     string
	Altitude int32
	Soil     SoilType
	Plants   int32
	UserID   uuid.UUID
}

type CreateVineyardRow struct {
	ID        int32
	Name      string
	Altitude  int32
	Soil      SoilType
	Plants    int32
	CreatedAt time.Time
}

func (q *Queries) CreateVineyard(ctx context.Context, arg CreateVineyardParams) (CreateVineyardRow, error) {
	row := q.db.QueryRowContext(ctx, createVineyard,
		arg.Name,
		arg.Altitude,
		arg.Soil,
		arg.Plants,
		arg.UserID,
	)
	var i CreateVineyardRow
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Altitude,
		&i.Soil,
		&i.Plants,
		&i.CreatedAt,
	)
	return i, err
}

const createVineyardAction = `-- name: CreateVineyardAction :one
INSERT INTO vineyard_actions (
    vineyard_id, user_id, action_type, action_date
) VALUES ($1, $2, $3, $4)
RETURNING id, vineyard_id, action_type, action_date, created_at
`

type CreateVineyardActionParams struct {
	VineyardID int32
	UserID     uuid.UUID
	ActionType ActionTypeEnum
	ActionDate time.Time
}

type CreateVineyardActionRow struct {
	ID         int32
	VineyardID int32
	ActionType ActionTypeEnum
	ActionDate time.Time
	CreatedAt  time.Time
}

func (q *Queries) CreateVineyardAction(ctx context.Context, arg CreateVineyardActionParams) (CreateVineyardActionRow, error) {
	row := q.db.QueryRowContext(ctx, createVineyardAction,
		arg.VineyardID,
		arg.UserID,
		arg.ActionType,
		arg.ActionDate,
	)
	var i CreateVineyardActionRow
	err := row.Scan(
		&i.ID,
		&i.VineyardID,
		&i.ActionType,
		&i.ActionDate,
		&i.CreatedAt,
	)
	return i, err
}

const createVineyardPlanting = `-- name: CreateVineyardPlanting :one
INSERT INTO vineyard_plantings (
    action_id, planting_type, plant_count
) VALUES ($1, $2, $3)
RETURNING planting_type
`

type CreateVineyardPlantingParams struct {
	ActionID     int32
	PlantingType PlantingTypeEnum
	PlantCount   int32
}

func (q *Queries) CreateVineyardPlanting(ctx context.Context, arg CreateVineyardPlantingParams) (PlantingTypeEnum, error) {
	row := q.db.QueryRowContext(ctx, createVineyardPlanting, arg.ActionID, arg.PlantingType, arg.PlantCount)
	var planting_type PlantingTypeEnum
	err := row.Scan(&planting_type)
	return planting_type, err
}

const createVineyardTreatment = `-- name: CreateVineyardTreatment :one
INSERT INTO vineyard_treatments (
    action_id, product, treatment_type
) VALUES ($1, $2, $3)
RETURNING product, treatment_type
`

type CreateVineyardTreatmentParams struct {
	ActionID      int32
	Product       string
	TreatmentType TreatmentTypeEnum
}

type CreateVineyardTreatmentRow struct {
	Product       string
	TreatmentType TreatmentTypeEnum
}

func (q *Queries) CreateVineyardTreatment(ctx context.Context, arg CreateVineyardTreatmentParams) (CreateVineyardTreatmentRow, error) {
	row := q.db.QueryRowContext(ctx, createVineyardTreatment, arg.ActionID, arg.Product, arg.TreatmentType)
	var i CreateVineyardTreatmentRow
	err := row.Scan(&i.Product, &i.TreatmentType)
	return i, err
}

const getUserByEmail = `-- name: GetUserByEmail :one
SELECT id, name, email, password
FROM users
WHERE email = $1
`

type GetUserByEmailRow struct {
	ID       uuid.UUID
	Name     string
	Email    string
	Password string
}

func (q *Queries) GetUserByEmail(ctx context.Context, email string) (GetUserByEmailRow, error) {
	row := q.db.QueryRowContext(ctx, getUserByEmail, email)
	var i GetUserByEmailRow
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Email,
		&i.Password,
	)
	return i, err
}

const getUserById = `-- name: GetUserById :one
SELECT id, name, email, password
FROM users
WHERE id = $1
`

type GetUserByIdRow struct {
	ID       uuid.UUID
	Name     string
	Email    string
	Password string
}

func (q *Queries) GetUserById(ctx context.Context, id uuid.UUID) (GetUserByIdRow, error) {
	row := q.db.QueryRowContext(ctx, getUserById, id)
	var i GetUserByIdRow
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Email,
		&i.Password,
	)
	return i, err
}

const getVineyardById = `-- name: GetVineyardById :one
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
    v.id = $1 AND v.user_id = $2
`

type GetVineyardByIdParams struct {
	ID     int32
	UserID uuid.UUID
}

type GetVineyardByIdRow struct {
	VineyardID       int32
	VineyardName     string
	Altitude         int32
	Soil             SoilType
	Plants           int32
	CreatedAt        time.Time
	GrapeVarietyID   sql.NullInt32
	GrapeVarietyName sql.NullString
	Rows             sql.NullInt32
	Age              sql.NullInt32
}

func (q *Queries) GetVineyardById(ctx context.Context, arg GetVineyardByIdParams) (GetVineyardByIdRow, error) {
	row := q.db.QueryRowContext(ctx, getVineyardById, arg.ID, arg.UserID)
	var i GetVineyardByIdRow
	err := row.Scan(
		&i.VineyardID,
		&i.VineyardName,
		&i.Altitude,
		&i.Soil,
		&i.Plants,
		&i.CreatedAt,
		&i.GrapeVarietyID,
		&i.GrapeVarietyName,
		&i.Rows,
		&i.Age,
	)
	return i, err
}

const listVineyards = `-- name: ListVineyards :many
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
    vp.plant_count AS vineyard_planting_count,
    vt.id AS vineyard_treatment_id,
    vt.product AS vineyard_treatment_product,
    vt.treatment_type AS vineyard_treatment_type
FROM
    vineyards v
LEFT JOIN
    grape_varieties gv ON gv.vineyard_id = v.id
LEFT JOIN
    vineyard_actions va ON va.vineyard_id = v.id
LEFT JOIN
    vineyard_plantings vp ON vp.action_id = va.id
LEFT JOIN
    vineyard_treatments vt ON vp.action_id = vt.id
WHERE
    v.user_id = $1
`

type ListVineyardsRow struct {
	VineyardID               int32
	VineyardName             string
	Altitude                 int32
	Soil                     SoilType
	Plants                   int32
	CreatedAt                time.Time
	GrapeVarietyID           sql.NullInt32
	GrapeVarietyName         sql.NullString
	Rows                     sql.NullInt32
	Age                      sql.NullInt32
	VineyardActionID         sql.NullInt32
	ActionType               NullActionTypeEnum
	ActionDate               sql.NullTime
	VineyardPlantingID       sql.NullInt32
	VineyardPlantingType     NullPlantingTypeEnum
	VineyardPlantingCount    sql.NullInt32
	VineyardTreatmentID      sql.NullInt32
	VineyardTreatmentProduct sql.NullString
	VineyardTreatmentType    NullTreatmentTypeEnum
}

func (q *Queries) ListVineyards(ctx context.Context, userID uuid.UUID) ([]ListVineyardsRow, error) {
	rows, err := q.db.QueryContext(ctx, listVineyards, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ListVineyardsRow
	for rows.Next() {
		var i ListVineyardsRow
		if err := rows.Scan(
			&i.VineyardID,
			&i.VineyardName,
			&i.Altitude,
			&i.Soil,
			&i.Plants,
			&i.CreatedAt,
			&i.GrapeVarietyID,
			&i.GrapeVarietyName,
			&i.Rows,
			&i.Age,
			&i.VineyardActionID,
			&i.ActionType,
			&i.ActionDate,
			&i.VineyardPlantingID,
			&i.VineyardPlantingType,
			&i.VineyardPlantingCount,
			&i.VineyardTreatmentID,
			&i.VineyardTreatmentProduct,
			&i.VineyardTreatmentType,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
