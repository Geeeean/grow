package handlers

import (
	"database/sql"
	"encoding/json"
	"maps"
	"net/http"
	"slices"
	"strconv"

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

	vineyardResponseMap := make(map[int]*dto.VineyardAddResponse)

	for _, vineyard := range vineyards {
		_, exists := vineyardResponseMap[int(vineyard.VineyardID)]
		if !exists {
			vineyardResponse := dto.VineyardListItemToResponse(vineyard)
			vineyardResponseMap[int(vineyard.VineyardID)] = &vineyardResponse
		}

		if vineyard.GrapeVarietyID.Valid {
			vineyardResponseMap[int(vineyard.VineyardID)].Varieties = append(
				vineyardResponseMap[int(vineyard.VineyardID)].Varieties,
				dto.VarietyAddResponse{
					ID:   vineyard.GrapeVarietyID.Int32,
					Name: vineyard.GrapeVarietyName.String,
					Age:  vineyard.Age.Int32,
					Rows: vineyard.Rows.Int32,
				})
		}
	}

	result := slices.Collect(maps.Values(vineyardResponseMap))
	if result == nil {
		result = []*dto.VineyardAddResponse{}
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
	vineyardAddParams := storage.CreateVineyardParams{
		Name:     vineyardAddRequest.Name,
		Altitude: vineyardAddRequest.Altitude,
		Soil:     vineyardAddRequest.Soil,
		Plants:   vineyardAddRequest.Plants,
		UserID:   *userID,
	}

	vineyard, err := qtx.CreateVineyard(r.Context(), vineyardAddParams)
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "cant create new vineyard")
	}

	log.GetLogger().Debug("INSERTED VINEYARD")

	vineyardResponse := dto.VineyardAddResponse{
		ID:        vineyard.ID,
		Name:      vineyard.Name,
		Altitude:  vineyard.Altitude,
		Soil:      vineyard.Soil,
		Plants:    vineyard.Plants,
		Varieties: make([]dto.VarietyAddResponse, len(varietiesAddRequest)),
	}

	//inserting varieties
	for i, varietyAddRequest := range varietiesAddRequest {
		varietyAddParams := storage.CreateGrapeVarietyParams{
			Name:       varietyAddRequest.Name,
			Rows:       varietyAddRequest.Rows,
			Age:        varietyAddRequest.Age,
			VineyardID: vineyard.ID,
			UserID:     *userID,
		}

		variety, err := qtx.CreateGrapeVariety(r.Context(), varietyAddParams)
		if err != nil {
			log.GetLogger().Error(err.Error())
			return api.NewError(http.StatusInternalServerError, "cant create new vineyard")
		}

		vineyardResponse.Varieties[i] = dto.VarietyAddResponse{
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

	return api.NewSuccess(http.StatusCreated, "vineyard created", vineyardResponse)
}

func (handler *VineyardHandler) AddTrim(w http.ResponseWriter, r *http.Request) api.Response {
	userID, err := utils.GetUserID(r)

	log.GetLogger().Debug("user id on adding trim: " + (*userID).String())

	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "unable to get user id")
	}

	var trimAddRequest dto.TrimAddRequest
	if err := json.NewDecoder(r.Body).Decode(&trimAddRequest); err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "cant create new trim")
	}

	vineyardId, err := strconv.ParseInt(r.PathValue("id"), 10, 32)
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "invalid vineyardId while adding a trim")
	}

	trimAddParams := storage.CreateVineyardActionParams{
		ActionDate: trimAddRequest.Date,
		VineyardID: int32(vineyardId),
		UserID:     *userID,
		ActionType: storage.ActionTypeEnumTrim,
	}

	trim, err := handler.storage.CreateVineyardAction(r.Context(), trimAddParams)
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "cant create new vineyard trim")
	}

	trimAddResponse := dto.TrimAddResponse{
		Date:       trim.ActionDate,
		VineyardId: trim.VineyardID,
		ID:         trim.ID,
	}

	return api.NewSuccess(http.StatusCreated, "trim created", trimAddResponse)
}

func (handler *VineyardHandler) AddCut(w http.ResponseWriter, r *http.Request) api.Response {
	userID, err := utils.GetUserID(r)
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "unable to get user id")
	}

	var cutAddRequest dto.CutAddRequest
	if err := json.NewDecoder(r.Body).Decode(&cutAddRequest); err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "cant create new cut")
	}

	vineyardId, err := strconv.ParseInt(r.PathValue("id"), 10, 32)
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "invalid vineyardId while adding a cut")
	}

	cutAddParams := storage.CreateVineyardActionParams{
		ActionDate: cutAddRequest.Date,
		VineyardID: int32(vineyardId),
		UserID:     *userID,
		ActionType: storage.ActionTypeEnumCut,
	}

	cut, err := handler.storage.CreateVineyardAction(r.Context(), cutAddParams)
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "cant create new vineyard cut")
	}

	cutAddResponse := dto.CutAddResponse{
		Date:       cut.ActionDate,
		VineyardId: cut.VineyardID,
		ID:         cut.ID,
	}

	return api.NewSuccess(http.StatusCreated, "cut created", cutAddResponse)
}

func (handler *VineyardHandler) AddPlanting(w http.ResponseWriter, r *http.Request) api.Response {
	userID, err := utils.GetUserID(r)
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "unable to get user id")
	}

	var plantingAddRequest dto.PlantingAddRequest
	if err := json.NewDecoder(r.Body).Decode(&plantingAddRequest); err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "cant create new planting")
	}

	vineyardId, err := strconv.ParseInt(r.PathValue("id"), 10, 32)
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "invalid vineyardId while adding a planting")
	}

	log.GetLogger().Debug("START TRANSACTION")

	tx, err := handler.db.Begin()
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "cant create new planting")
	}
	defer tx.Rollback()

	qtx := handler.storage.WithTx(tx)

	plantingAddParams := storage.CreateVineyardActionParams{
		ActionDate: plantingAddRequest.Date,
		VineyardID: int32(vineyardId),
		UserID:     *userID,
		ActionType: storage.ActionTypeEnumPlanting,
	}

	planting, err := qtx.CreateVineyardAction(r.Context(), plantingAddParams)
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "cant create new vineyard")
	}

	log.GetLogger().Debug("INSERTED PLANTING")

	planting_aux, err := qtx.CreateVineyardPlanting(r.Context(), storage.CreateVineyardPlantingParams{
		ActionID:     planting.ID,
		PlantingType: plantingAddRequest.PlantingType,
        PlantCount: plantingAddRequest.PlantCount,
	})

	if err := tx.Commit(); err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "cant create new vineyard")
	}

	plantingAddResponse := dto.PlantingAddResponse{
		ID:           planting.ID,
		VineyardId:   planting.VineyardID,
		Date:         planting.ActionDate,
		PlantingType: planting_aux,
	}

	return api.NewSuccess(http.StatusCreated, "cut created", plantingAddResponse)
}
