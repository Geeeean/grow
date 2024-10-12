package routers

import (
	"net/http"

	"github.com/Geeeean/grow/internal/handlers"
	"github.com/Geeeean/grow/internal/middlewares"
	"github.com/Geeeean/grow/internal/storage"
)

type HarvestRouter struct {
    mux *http.ServeMux
    handler *handlers.HarvestHandler
}

func NewHarvestRouter(storage *storage.Queries) *HarvestRouter {
    router := &HarvestRouter{
        mux: http.NewServeMux(),
        handler: handlers.NewHarvestHandler(storage),
    }

    router.mux.HandleFunc("/get/all", middlewares.Wrapper(middlewares.Auth(router.handler.GetAll)))
    router.mux.HandleFunc("/add", middlewares.Wrapper(middlewares.Auth(router.handler.Add)))

    return router
}

func (router *HarvestRouter) Mux() *http.ServeMux {
    return router.mux
}

