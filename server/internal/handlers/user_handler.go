package handlers

import (
	"net/http"

	"github.com/Geeeean/grow/internal/api"
	"github.com/Geeeean/grow/internal/dto"
	"github.com/Geeeean/grow/internal/storage"
	"github.com/Geeeean/grow/internal/utils"
)

type UserHandler struct {
	storage *storage.Queries
}

func NewUserHandler(storage *storage.Queries) *UserHandler {
	return &UserHandler{storage: storage}
}

func (handler *UserHandler) Info(w http.ResponseWriter, r *http.Request) api.Response {
	userID, err := utils.GetUserID(r)
	if err != nil {
		return api.NewError(http.StatusInternalServerError, "unable to get user id")
	}

	user, err := handler.storage.GetUserById(r.Context(), *userID)

	userResponse := &dto.UserResponse{Name: user.Name, Email: user.Email}
	return api.NewSuccess(http.StatusOK, "successful getting user info", userResponse)
}
