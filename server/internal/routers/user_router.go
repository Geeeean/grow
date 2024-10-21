package routers

import (
	"net/http"

	"github.com/Geeeean/grow/internal/handlers"
	"github.com/Geeeean/grow/internal/middlewares"
	"github.com/Geeeean/grow/internal/storage"
)

type UserRouter struct {
	mux     *http.ServeMux
	handler *handlers.UserHandler
}

func NewUserRouter(storage *storage.Queries) *UserRouter {
	router := &UserRouter {
		mux:     http.NewServeMux(),
		handler: handlers.NewUserHandler(storage),
	}

	router.mux.HandleFunc("/info", middlewares.Wrapper(middlewares.Auth(router.handler.Info)))

    return router
}

func (router *UserRouter) Mux() *http.ServeMux {
	return router.mux
}

