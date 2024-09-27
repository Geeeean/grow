package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/Geeeean/grow/internal/api"
	"github.com/Geeeean/grow/internal/utils"
	"github.com/Geeeean/grow/internal/dao"
	"github.com/Geeeean/grow/internal/dto"
	"github.com/lib/pq"
)

type UserHandler struct {
	userDAO *dao.UserDAO
}

func NewUserHandler(db *sql.DB) *UserHandler {
	userDAO := dao.NewUserDAO(db)

	return &UserHandler{userDAO: userDAO}
}

func (uHandler *UserHandler) SignUp(w http.ResponseWriter, r *http.Request) api.APIResponse {
	var userSignup dto.UserSignup

	err := json.NewDecoder(r.Body).Decode(&userSignup)
	if err != nil {
		return api.NewAPIError(http.StatusBadRequest, err.Error())
	}

    hashed, err := utils.HashPassword(userSignup.Password)
    if err != nil {
        return api.NewAPIError(http.StatusInternalServerError, err.Error())
    }

    userSignup.Password = hashed

	user, err := uHandler.userDAO.CreateUser(&userSignup)
	if err != nil {
        if pqErr, ok := err.(*pq.Error); ok {
            switch pqErr.Code.Name() {
                case "unique_violation":
                    return api.NewAPIError(http.StatusBadRequest, "email already exists")
                case "not_null_violation":
                    return api.NewAPIError(http.StatusBadRequest, "missing required fields")
            }
        }

		return api.NewAPIError(http.StatusInternalServerError, err.Error())
	}

	userResponse := &dto.UserResponse{Name: user.Name, Email: user.Email}

	return api.NewAPISuccess(http.StatusOK, "successful signup", userResponse)
}

func (uHandler *UserHandler) SignIn(w http.ResponseWriter, r *http.Request) api.APIResponse {
    var userSignin dto.UserSignin

    err := json.NewDecoder(r.Body).Decode(&userSignin)
    if err != nil {
        return api.NewAPIError(http.StatusBadRequest, err.Error())
    }

    user, err := uHandler.userDAO.GetUser(&userSignin)

    if err == sql.ErrNoRows {
        return api.NewAPIError(http.StatusBadRequest, "user not found")
    }

    if err != nil {
        return api.NewAPIError(http.StatusInternalServerError, err.Error())
    }

    if utils.VerifyPassword(userSignin.Password, user.Password) {
        userResponse := &dto.UserResponse{Name: user.Name, Email: user.Email}
        return api.NewAPISuccess(http.StatusOK, "successful signin", userResponse)
    }

    return api.NewAPIError(http.StatusBadRequest, "bad credentials")
}
