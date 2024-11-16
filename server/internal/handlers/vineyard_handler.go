package handlers

import (
	"database/sql"
	"encoding/json"
	"maps"
	"net/http"
	"slices"

	"github.com/Geeeean/grow/internal/api"
	"github.com/Geeeean/grow/internal/dto"
	"github.com/Geeeean/grow/internal/log"
	"github.com/Geeeean/grow/internal/storage"
	"github.com/Geeeean/grow/internal/utils"
)

type VineyardHandler struct {
	db      *sql.DB
	storage *storage.Queries
}

func NewVineyardHandler(db *sql.DB, storage *storage.Queries) *VineyardHandler {
	return &VineyardHandler{db: db, storage: storage}
}

func (handler *VineyardHandler) GetAll(w http.ResponseWriter, r *http.Request) api.Response {
	userID, err := utils.GetUserID(r)
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "unable to get user id")
	}

	vineyards, err := handler.storage.ListVineyards(r.Context(), *userID)
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "unable to get vineyard list")
	}

	vineyardResponseMap := make(map[int]*dto.VineyardResponse)

	for _, vineyard := range vineyards {
		_, exists := vineyardResponseMap[int(vineyard.VineyardID)]
		if !exists {
			vineyardResponse := dto.VineyardListItemToResponse(vineyard)
			vineyardResponseMap[int(vineyard.VineyardID)] = &vineyardResponse
		}

		if vineyard.GrapeVarietyID.Valid {
			vineyardResponseMap[int(vineyard.VineyardID)].Varieties = append(
				vineyardResponseMap[int(vineyard.VineyardID)].Varieties,
				dto.VarietyResponse{
					ID:   vineyard.GrapeVarietyID.Int32,
					Name: vineyard.GrapeVarietyName.String,
					Age:  vineyard.Age.Int32,
					Rows: vineyard.Rows.Int32,
				})
		}
	}

	result := slices.Collect(maps.Values(vineyardResponseMap))
	if result == nil {
		result = []*dto.VineyardResponse{}
	}
	return api.NewSuccess(http.StatusOK, "vineyard list", result)
}

func (handler *VineyardHandler) Add(w http.ResponseWriter, r *http.Request) api.Response {
	userID, err := utils.GetUserID(r)
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "unable to get user id")
	}

	var vineyardAddRequest dto.VineyardAddRequest
	if err := json.NewDecoder(r.Body).Decode(&vineyardAddRequest); err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "cant create new vineyard")
	}

	varietiesAddRequest := vineyardAddRequest.Varieties

	log.GetLogger().Debug("START TRANSACTION")

	tx, err := handler.db.Begin()
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "cant create new vineyard")
	}
	defer tx.Rollback()

	qtx := handler.storage.WithTx(tx)

	//inserting vineyard
	vineyardAddParam := storage.CreateVineyardParams{
		Name:     vineyardAddRequest.Name,
		Altitude: vineyardAddRequest.Altitude,
		Soil:     vineyardAddRequest.Soil,
		Plants:   vineyardAddRequest.Plants,
		UserID:   *userID,
	}

	vineyard, err := qtx.CreateVineyard(r.Context(), vineyardAddParam)
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "cant create new vineyard")
	}

	log.GetLogger().Debug("INSERTED VINEYARD")

	vineyardResponse := dto.VineyardResponse{
		ID:        vineyard.ID,
		Name:      vineyard.Name,
		Altitude:  vineyard.Altitude,
		Soil:      vineyard.Soil,
		Plants:    vineyard.Plants,
		Varieties: make([]dto.VarietyResponse, len(varietiesAddRequest)),
	}

	//inserting varieties
	for i, varietyAddRequest := range varietiesAddRequest {
		varietyAddParam := storage.CreateGrapeVarietyParams{
			Name:       varietyAddRequest.Name,
			Rows:       varietyAddRequest.Rows,
			Age:        varietyAddRequest.Age,
			VineyardID: vineyard.ID,
			UserID:     *userID,
		}

		variety, err := qtx.CreateGrapeVariety(r.Context(), varietyAddParam)
		if err != nil {
			log.GetLogger().Error(err.Error())
			return api.NewError(http.StatusInternalServerError, "cant create new vineyard")
		}

		vineyardResponse.Varieties[i] = dto.VarietyResponse{
			ID:   variety.ID,
			Name: variety.Name,
			Age:  variety.Age,
			Rows: variety.Rows,
		}
	}

	if err := tx.Commit(); err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "cant create new vineyard")
	}

	log.GetLogger().Debug("END TRANSACTION")

	return api.NewSuccess(http.StatusOK, "vineyard created", vineyardResponse)
}
