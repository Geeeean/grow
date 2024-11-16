package handlers

import (
	"database/sql"
	"net/http"

	"github.com/Geeeean/grow/internal/api"
	"github.com/Geeeean/grow/internal/dto"
	"github.com/Geeeean/grow/internal/log"
	"github.com/Geeeean/grow/internal/storage"
	"github.com/Geeeean/grow/internal/utils"
)

type UserHandler struct {
	db      *sql.DB
	storage *storage.Queries
}

func NewUserHandler(db *sql.DB, storage *storage.Queries) *UserHandler {
	return &UserHandler{db: db, storage: storage}
}

func (handler *UserHandler) Info(w http.ResponseWriter, r *http.Request) api.Response {
	userID, err := utils.GetUserID(r)
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "unable to get user id")
	}

	user, err := handler.storage.GetUserById(r.Context(), *userID)

	userResponse := &dto.UserResponse{Name: user.Name, Email: user.Email}
	return api.NewSuccess(http.StatusOK, "successful getting user info", userResponse)
}
