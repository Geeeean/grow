package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/Geeeean/grow/internal/api"
	"github.com/Geeeean/grow/internal/dao"
	"github.com/Geeeean/grow/internal/dto"
	"github.com/Geeeean/grow/internal/utils"
	"github.com/lib/pq"
)

type AuthHandler struct {
	userDAO *dao.UserDAO
}

func NewAuthHandler(db *sql.DB) *AuthHandler {
	userDAO := dao.NewUserDAO(db)

	return &AuthHandler{userDAO: userDAO}
}

func (handler *AuthHandler) SignUp(w http.ResponseWriter, r *http.Request) api.APIResponse {
	var userSignup dto.UserSignup

	err := json.NewDecoder(r.Body).Decode(&userSignup)
	if err != nil {
		return api.NewAPIError(http.StatusBadRequest, err.Error())
	}

    userSignup.Password, err = utils.HashPassword(userSignup.Password)
    if err != nil {
        return api.NewAPIError(http.StatusInternalServerError, err.Error())
    }

	user, err := handler.userDAO.CreateUser(&userSignup)
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

func (handler *AuthHandler) SignIn(w http.ResponseWriter, r *http.Request) api.APIResponse {
    var userSignin dto.UserSignin

    err := json.NewDecoder(r.Body).Decode(&userSignin)
    if err != nil {
        return api.NewAPIError(http.StatusBadRequest, err.Error())
    }

    user, err := handler.userDAO.GetUser(&userSignin)

    if err == sql.ErrNoRows {
        return api.NewAPIError(http.StatusBadRequest, "user not found")
    }

    if err != nil {
        return api.NewAPIError(http.StatusInternalServerError, err.Error())
    }

    if !utils.VerifyPassword(userSignin.Password, user.Password) {
        return api.NewAPIError(http.StatusBadRequest, "bad credentials")
    }

    /*** SESSION TOKEN (JWT)  ***/
    jwtToken, err := utils.CreateToken(user.ID)
    if err != nil {
        return api.NewAPIError(http.StatusInternalServerError, "error on creating session token")
    }

    sessionCookie := &http.Cookie{Name: "token", Value: jwtToken, Secure: true, HttpOnly: true}
    http.SetCookie(w, sessionCookie)

    userResponse := &dto.UserResponse{Name: user.Name, Email: user.Email}
    return api.NewAPISuccess(http.StatusOK, "successful signin", userResponse)
}

func (handler *AuthHandler) GetInfo(w http.ResponseWriter, r *http.Request) api.APIResponse {
    userID, ok := r.Context().Value("id").(string)

    if !ok {
        return api.NewAPIError(http.StatusInternalServerError, "ciao")
    }

    return api.NewAPISuccess(http.StatusOK, "USER ID", userID)
}
