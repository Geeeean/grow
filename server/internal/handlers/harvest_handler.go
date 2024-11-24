package handlers

import (
	"database/sql"
	"net/http"

	"github.com/Geeeean/grow/internal/api"
	"github.com/Geeeean/grow/internal/storage"
)

type HarvestHandler struct {
	db      *sql.DB
	storage *storage.Queries
}

func NewHarvestHandler(db *sql.DB, storage *storage.Queries) *HarvestHandler {
	return &HarvestHandler{db: db, storage: storage}
}

func (handler *HarvestHandler) GetAll(w http.ResponseWriter, r *http.Request) api.Response {
    /*
	userID, err := utils.GetUserID(r)
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "unable to get user id")
	}
    */

    return api.NewError(http.StatusInternalServerError, "WIP")
}

func (handler *HarvestHandler) Add(w http.ResponseWriter, r *http.Request) api.Response {
    /*
	userID, err := utils.GetUserID(r)
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "unable to get user id")
	}
    */

    return api.NewError(http.StatusInternalServerError, "WIP")
}
