package dto

import (
	"time"

	"github.com/Geeeean/grow/internal/storage"
)

type VarietyAddRequest struct {
	Name string `json:"name"`
	Age  int32  `json:"age"`
	Rows int32  `json:"rows"`
}

type VineyardAddRequest struct {
	Name      string              `json:"name"`
	Altitude  int32               `json:"altitude"`
	Soil      storage.SoilType    `json:"soil"`
	Plants    int32               `json:"plants"`
	Varieties []VarietyAddRequest `json:"varieties"`
}

type VarietyAddResponse struct {
	ID   int32  `json:"id"`
	Name string `json:"name"`
	Age  int32  `json:"age"`
	Rows int32  `json:"rows"`
}

type VineyardAddResponse struct {
	ID        int32                `json:"id"`
	Name      string               `json:"name"`
	Altitude  int32                `json:"altitude"`
	Soil      storage.SoilType     `json:"soil"`
	Plants    int32                `json:"plants"`
	CreatedAt time.Time            `json:"createdAt"`
	Varieties []VarietyAddResponse `json:"varieties"`
}

type VineyardResponseList struct {
	Vineyards []VineyardAddResponse `json:"vineyards"`
}

type TrimAddRequest struct {
	Date time.Time `json:"date"`
}

type TrimAddResponse struct {
	ID         int32     `json:"id"`
	VineyardId int32     `json:"vineyardId"`
	Date       time.Time `json:"date"`
}

type CutAddRequest struct {
	Date time.Time `json:"date"`
}

type CutAddResponse struct {
	ID         int32     `json:"id"`
	VineyardId int32     `json:"vineyardId"`
	Date       time.Time `json:"date"`
}

type PlantingAddRequest struct {
	Date         time.Time                `json:"date"`
	PlantingType storage.PlantingTypeEnum `json:"plantingType"`
	PlantCount   int32                    `json:"plantCount"`
}

type PlantingAddResponse struct {
	ID           int32                    `json:"id"`
	VineyardId   int32                    `json:"vineyardId"`
	Date         time.Time                `json:"date"`
	PlantingType storage.PlantingTypeEnum `json:"plantingType"`
}

func VineyardListItemToResponse(vineyardModel storage.ListVineyardsRow) VineyardAddResponse {
	return VineyardAddResponse{
		ID:        vineyardModel.VineyardID,
		Name:      vineyardModel.VineyardName,
		Soil:      vineyardModel.Soil,
		Altitude:  vineyardModel.Altitude,
		Plants:    vineyardModel.Plants,
		Varieties: []VarietyAddResponse{},
		CreatedAt: vineyardModel.CreatedAt,
	}
}
