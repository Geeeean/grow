package dto

import (
	"time"

	"github.com/Geeeean/grow/internal/storage"
)

type HarvestAddRequest struct {
    GrapeVariety string `json:"grapeVariety"`
    QuantityCollected string `json:"quantityCollected"`
    QualityNotes string `json:"qualityNotes"`
    HarvestDate time.Time `json:"harvestDate"`
}

type HarvestResponse struct {
    ID int32 `json:"id"`
    GrapeVariety string `json:"grapeVariety"`
    QuantityCollected string `json:"quantityCollected"`
    QualityNotes string `json:"qualityNotes"`
    HarvestDate time.Time `json:"harvestDate"`
    CreatedAt time.Time `json:"createdAt"`
}

type HarvestResponseList struct {
    Harvests []HarvestResponse `json:"harvests"`
}

func HarvestListItemToResponse(harvestModel storage.ListHarvestsRow) HarvestResponse {
    return HarvestResponse{
        ID: harvestModel.ID,
        GrapeVariety: harvestModel.GrapeVariety,
        QuantityCollected: harvestModel.QuantityCollected,
        QualityNotes: harvestModel.QuantityCollected,
        HarvestDate: harvestModel.HarvestDate,
        CreatedAt: harvestModel.CreatedAt,
    }
}
