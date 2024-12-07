// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package storage

import (
	"database/sql/driver"
	"fmt"
	"time"

	"github.com/google/uuid"
)

type ActionTypeEnum string

const (
	ActionTypeEnumTrim      ActionTypeEnum = "trim"
	ActionTypeEnumCut       ActionTypeEnum = "cut"
	ActionTypeEnumPlanting  ActionTypeEnum = "planting"
	ActionTypeEnumTreatment ActionTypeEnum = "treatment"
	ActionTypeEnumHarvest   ActionTypeEnum = "harvest"
)

func (e *ActionTypeEnum) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = ActionTypeEnum(s)
	case string:
		*e = ActionTypeEnum(s)
	default:
		return fmt.Errorf("unsupported scan type for ActionTypeEnum: %T", src)
	}
	return nil
}

type NullActionTypeEnum struct {
	ActionTypeEnum ActionTypeEnum
	Valid          bool // Valid is true if ActionTypeEnum is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullActionTypeEnum) Scan(value interface{}) error {
	if value == nil {
		ns.ActionTypeEnum, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.ActionTypeEnum.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullActionTypeEnum) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return string(ns.ActionTypeEnum), nil
}

type PlantingTypeEnum string

const (
	PlantingTypeEnumRemoval  PlantingTypeEnum = "removal"
	PlantingTypeEnumPlanting PlantingTypeEnum = "planting"
)

func (e *PlantingTypeEnum) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = PlantingTypeEnum(s)
	case string:
		*e = PlantingTypeEnum(s)
	default:
		return fmt.Errorf("unsupported scan type for PlantingTypeEnum: %T", src)
	}
	return nil
}

type NullPlantingTypeEnum struct {
	PlantingTypeEnum PlantingTypeEnum
	Valid            bool // Valid is true if PlantingTypeEnum is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullPlantingTypeEnum) Scan(value interface{}) error {
	if value == nil {
		ns.PlantingTypeEnum, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.PlantingTypeEnum.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullPlantingTypeEnum) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return string(ns.PlantingTypeEnum), nil
}

type SoilType string

const (
	SoilTypeCalcareous SoilType = "Calcareous"
	SoilTypeClay       SoilType = "Clay"
	SoilTypeSandy      SoilType = "Sandy"
	SoilTypeGravelly   SoilType = "Gravelly"
	SoilTypeVolcanic   SoilType = "Volcanic"
	SoilTypeSchist     SoilType = "Schist"
	SoilTypeSilty      SoilType = "Silty"
	SoilTypeAlluvial   SoilType = "Alluvial"
)

func (e *SoilType) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = SoilType(s)
	case string:
		*e = SoilType(s)
	default:
		return fmt.Errorf("unsupported scan type for SoilType: %T", src)
	}
	return nil
}

type NullSoilType struct {
	SoilType SoilType
	Valid    bool // Valid is true if SoilType is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullSoilType) Scan(value interface{}) error {
	if value == nil {
		ns.SoilType, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.SoilType.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullSoilType) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return string(ns.SoilType), nil
}

type TreatmentTypeEnum string

const (
	TreatmentTypeEnumFungicide  TreatmentTypeEnum = "fungicide"
	TreatmentTypeEnumPesticide  TreatmentTypeEnum = "pesticide"
	TreatmentTypeEnumFertilizer TreatmentTypeEnum = "fertilizer"
	TreatmentTypeEnumIrrigation TreatmentTypeEnum = "irrigation"
)

func (e *TreatmentTypeEnum) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = TreatmentTypeEnum(s)
	case string:
		*e = TreatmentTypeEnum(s)
	default:
		return fmt.Errorf("unsupported scan type for TreatmentTypeEnum: %T", src)
	}
	return nil
}

type NullTreatmentTypeEnum struct {
	TreatmentTypeEnum TreatmentTypeEnum
	Valid             bool // Valid is true if TreatmentTypeEnum is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullTreatmentTypeEnum) Scan(value interface{}) error {
	if value == nil {
		ns.TreatmentTypeEnum, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.TreatmentTypeEnum.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullTreatmentTypeEnum) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return string(ns.TreatmentTypeEnum), nil
}

type GrapeVariety struct {
	ID         int32
	Name       string
	Rows       int32
	Age        int32
	VineyardID int32
	CreatedAt  time.Time
	UserID     uuid.UUID
}

type Harvest struct {
	ID              int32
	ActionID        int32
	QualityNotes    string
	NumberOfWorkers int32
	CreatedAt       time.Time
}

type HarvestGrapeVariety struct {
	ID             int32
	HarvestID      int32
	GrapeVarietyID int32
	TotalWeight    string
	CreatedAt      time.Time
}

type User struct {
	ID        uuid.UUID
	Name      string
	Email     string
	Password  string
	CreatedAt time.Time
}

type Vineyard struct {
	ID        int32
	Name      string
	Altitude  int32
	Soil      SoilType
	Plants    int32
	UserID    uuid.UUID
	CreatedAt time.Time
}

type VineyardAction struct {
	ID         int32
	VineyardID int32
	UserID     uuid.UUID
	ActionType ActionTypeEnum
	ActionDate time.Time
	CreatedAt  time.Time
}

type VineyardPlanting struct {
	ID           int32
	ActionID     int32
	PlantingType PlantingTypeEnum
	PlantCount   int32
	CreatedAt    time.Time
}

type VineyardTreatment struct {
	ID            int32
	ActionID      int32
	TreatmentType TreatmentTypeEnum
	Product       string
	CreatedAt     time.Time
}
