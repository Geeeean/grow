package routers

import (
	"net/http"

	"github.com/Geeeean/grow/internal/handlers"
	"github.com/Geeeean/grow/internal/log"
	"github.com/Geeeean/grow/internal/middlewares"
	"github.com/Geeeean/grow/internal/storage"
)

type AuthRouter struct {
	mux     *http.ServeMux
	handler *handlers.AuthHandler
}

func NewAuthRouter(storage *storage.Queries, prefix string) *AuthRouter {
	router := &AuthRouter{
		mux:     http.NewServeMux(),
		handler: handlers.NewAuthHandler(storage),
	}

	signupEndpoint := "/signup"
	signinEndpoint := "/signin"

	router.mux.HandleFunc(signupEndpoint, middlewares.Wrapper(router.handler.SignUp))
	router.mux.HandleFunc(signinEndpoint, middlewares.Wrapper(router.handler.SignIn))

    /*** LOGGING ***/
    log.GetLogger().Info("AUTH ROUTER")
	log.GetLogger().Info("signup endpoint available at " + prefix + signupEndpoint)
	log.GetLogger().Info("signin endpoint available at " + prefix + signinEndpoint)
    log.GetLogger().NewLine()

	return router
}

func (router *AuthRouter) Mux() *http.ServeMux {
	return router.mux
}
