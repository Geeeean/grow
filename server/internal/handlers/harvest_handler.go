package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/Geeeean/grow/internal/api"
	"github.com/Geeeean/grow/internal/dto"
	"github.com/Geeeean/grow/internal/storage"
	"github.com/Geeeean/grow/internal/utils"
)

type HarvestHandler struct {
    storage *storage.Queries
}

func NewHarvestHandler(storage *storage.Queries) *HarvestHandler {
    return &HarvestHandler{storage: storage}
}

func (handler *HarvestHandler) GetAll(w http.ResponseWriter, r *http.Request) api.Response {
    userID, err := utils.GetUserID(r)
    if err != nil {
        return api.NewError(http.StatusInternalServerError, "unable to get user id")
    }

    harvests, err := handler.storage.ListHarvests(r.Context(), *userID)
    if err != nil {
        return api.NewError(http.StatusInternalServerError, "unable to get harvest list")
    }

    var harvestResponseList dto.HarvestResponseList

    harvestResponseList.Harvests = make([]dto.HarvestResponse, len(harvests))
    for i, h := range(harvests) {
        harvestResponseList.Harvests[i] = dto.HarvestListItemToResponse(h)
    }

    return api.NewSuccess(http.StatusOK, "harvest list", harvestResponseList)
}

func (handler *HarvestHandler) Add(w http.ResponseWriter, r *http.Request) api.Response {
    userID, err := utils.GetUserID(r)
    if err != nil {
        return api.NewError(http.StatusInternalServerError, "unable to get user id")
    }

	var harvestAddRequest dto.HarvestAddRequest
    err = json.NewDecoder(r.Body).Decode(&harvestAddRequest)
	if err != nil {
		return api.NewError(http.StatusBadRequest, err.Error())
	}

    harvestAddParam := storage.CreateHarvestParams{
        GrapeVariety: harvestAddRequest.GrapeVariety,
        QuantityCollected: harvestAddRequest.QuantityCollected,
        QualityNotes: harvestAddRequest.QualityNotes,
        HarvestDate: harvestAddRequest.HarvestDate,
        UserID: *userID,
    }

    harvest, err := handler.storage.CreateHarvest(r.Context(), storage.CreateHarvestParams(harvestAddParam))
    if err != nil {
        return api.NewError(http.StatusInternalServerError, "cant create new harvest")
    }

    return api.NewSuccess(http.StatusOK, "harvest created", dto.HarvestResponse(harvest))
}
