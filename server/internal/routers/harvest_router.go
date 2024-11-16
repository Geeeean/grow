package routers

import (
	"database/sql"
	"net/http"

	"github.com/Geeeean/grow/internal/handlers"
	"github.com/Geeeean/grow/internal/log"
	"github.com/Geeeean/grow/internal/middlewares"
	"github.com/Geeeean/grow/internal/storage"
)

type HarvestRouter struct {
	mux     *http.ServeMux
	handler *handlers.HarvestHandler
}

func NewHarvestRouter(db *sql.DB, storage *storage.Queries, prefix string) *HarvestRouter {
	router := &HarvestRouter{
		mux:     http.NewServeMux(),
		handler: handlers.NewHarvestHandler(db, storage),
	}

	getAllEndpoint := "/get/all"
	addEndpoint := "/add"

	router.mux.HandleFunc(getAllEndpoint, middlewares.Wrapper(http.MethodGet, middlewares.Auth(router.handler.GetAll)))
	router.mux.HandleFunc(addEndpoint, middlewares.Wrapper(http.MethodPost, middlewares.Auth(router.handler.Add)))

	/*** LOGGING ***/
	log.GetLogger().Info("HARVEST ROUTER")
	log.GetLogger().Info("get all endpoint available at " + prefix + getAllEndpoint)
	log.GetLogger().Info("add endpoint available at " + prefix + addEndpoint)
	log.GetLogger().NewLine()

	return router
}

func (router *HarvestRouter) Mux() *http.ServeMux {
	return router.mux
}
