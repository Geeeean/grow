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

type VarietyResponse struct {
	ID   int32  `json:"id"`
	Name string `json:"name"`
	Age  int32  `json:"age"`
	Rows int32  `json:"rows"`
}

type VineyardResponse struct {
	ID        int32             `json:"id"`
	Name      string            `json:"name"`
	Altitude  int32             `json:"altitude"`
	Soil      storage.SoilType  `json:"soil"`
	Plants    int32             `json:"plants"`
	CreatedAt time.Time         `json:"createdAt"`
	Varieties []VarietyResponse `json:"varieties"`
}

type VineyardResponseList struct {
	Vineyards []VineyardResponse `json:"vineyards"`
}

func VineyardListItemToResponse(vineyardModel storage.ListVineyardsRow) VineyardResponse {
	return VineyardResponse{
		ID:        vineyardModel.VineyardID,
		Name:      vineyardModel.VineyardName,
		Soil:      vineyardModel.Soil,
		Altitude:  vineyardModel.Altitude,
		Plants:    vineyardModel.Plants,
        Varieties: []VarietyResponse{},
		CreatedAt: vineyardModel.CreatedAt,
	}
}
