package routers

import (
	"net/http"

	"github.com/Geeeean/grow/internal/handlers"
	"github.com/Geeeean/grow/internal/log"
	"github.com/Geeeean/grow/internal/middlewares"
	"github.com/Geeeean/grow/internal/storage"
)

type UserRouter struct {
	mux     *http.ServeMux
	handler *handlers.UserHandler
}

func NewUserRouter(storage *storage.Queries, prefix string) *UserRouter {
	router := &UserRouter {
		mux:     http.NewServeMux(),
		handler: handlers.NewUserHandler(storage),
	}

    infoEndpoint := "/info"

	router.mux.HandleFunc(infoEndpoint, middlewares.Wrapper(middlewares.Auth(router.handler.Info)))

    /*** LOGGING ***/
    log.GetLogger().Info("USER ROUTER")
	log.GetLogger().Info("info endpoint available at " + prefix + infoEndpoint)
    log.GetLogger().NewLine()

    return router
}

func (router *UserRouter) Mux() *http.ServeMux {
	return router.mux
}

