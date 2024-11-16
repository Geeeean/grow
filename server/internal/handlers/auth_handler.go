package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/Geeeean/grow/internal/api"
	"github.com/Geeeean/grow/internal/dto"
	"github.com/Geeeean/grow/internal/log"
	"github.com/Geeeean/grow/internal/storage"
	"github.com/Geeeean/grow/internal/utils"
	"github.com/lib/pq"
)

type AuthHandler struct {
	db      *sql.DB
	storage *storage.Queries
}

func NewAuthHandler(db *sql.DB, storage *storage.Queries) *AuthHandler {
	return &AuthHandler{db: db, storage: storage}
}

func (handler *AuthHandler) SignUp(w http.ResponseWriter, r *http.Request) api.Response {
	var userSignup dto.UserSignup

	err := json.NewDecoder(r.Body).Decode(&userSignup)
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusBadRequest, "invalid request body format")
	}

	userSignup.Password, err = utils.HashPassword(userSignup.Password)
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "internal server error")
	}

	user, err := handler.storage.CreateUser(r.Context(), storage.CreateUserParams(userSignup))
	if err != nil {
		log.GetLogger().Error(err.Error())

		if pqErr, ok := err.(*pq.Error); ok {
			switch pqErr.Code.Name() {
			case "unique_violation":
				return api.NewError(http.StatusBadRequest, "email already exists")
			case "not_null_violation":
				return api.NewError(http.StatusBadRequest, "missing required fields")
			}
		}

		return api.NewError(http.StatusInternalServerError, "internal server error")
	}

	userResponse := &dto.UserResponse{Name: user.Name, Email: user.Email}
	return api.NewSuccess(http.StatusOK, "successful signup", userResponse)
}

func (handler *AuthHandler) SignIn(w http.ResponseWriter, r *http.Request) api.Response {

	var userSignin dto.UserSignin

	log.GetLogger().Debug("handling signin from " + r.Header.Get("Origin"))

	err := json.NewDecoder(r.Body).Decode(&userSignin)
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusBadRequest, "invalid request body format")
	}

	user, err := handler.storage.GetUserByEmail(r.Context(), userSignin.Email)
	if err == sql.ErrNoRows {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusNotFound, "user not found")
	}

	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "internal server error")
	}

	if !utils.VerifyPassword(userSignin.Password, user.Password) {
		log.GetLogger().Error("bad credentials user: " + userSignin.Email)
		return api.NewError(http.StatusUnauthorized, "bad credentials")
	}

	/*** SESSION TOKEN (JWT)  ***/
	jwtToken, err := utils.CreateToken(user.ID)
	if err != nil {
		log.GetLogger().Error(err.Error())
		return api.NewError(http.StatusInternalServerError, "internal server error")
	}

	sessionCookie := &http.Cookie{
		Name:     "grow.session-token",
		Value:    jwtToken,
		Secure:   false,
		HttpOnly: true,
		Path:     "/api",
		SameSite: http.SameSiteLaxMode,
	}
	http.SetCookie(w, sessionCookie)

	userResponse := &dto.UserResponse{Name: user.Name, Email: user.Email}
	return api.NewSuccess(http.StatusOK, "successful signin", userResponse)
}
