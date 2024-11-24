package routers

import (
	"database/sql"
	"net/http"

	"github.com/Geeeean/grow/internal/handlers"
	"github.com/Geeeean/grow/internal/log"
	"github.com/Geeeean/grow/internal/middlewares"
	"github.com/Geeeean/grow/internal/storage"
)

type VineyardRouter struct {
	mux     *http.ServeMux
	handler *handlers.VineyardHandler
}

func NewVineyardRouter(db *sql.DB, storage *storage.Queries, prefix string) *VineyardRouter {
	router := &VineyardRouter{
		mux:     http.NewServeMux(),
		handler: handlers.NewVineyardHandler(db, storage),
	}

	getAllEndpoint := "/get/all"
	addEndpoint := "/add"
	addTrimEndpoint := "/{id}/trim/add"
	addCutEndpoint := "/{id}/cut/add"
	addPlantingEndpoint := "/{id}/planting/add"

	router.mux.HandleFunc(getAllEndpoint, middlewares.Wrapper(http.MethodGet, middlewares.Auth(router.handler.GetAll)))
	router.mux.HandleFunc(addEndpoint, middlewares.Wrapper(http.MethodPost, middlewares.Auth(router.handler.Add)))
	router.mux.HandleFunc(addTrimEndpoint, middlewares.Wrapper(http.MethodPost, middlewares.Auth(router.handler.AddTrim)))
	router.mux.HandleFunc(addCutEndpoint, middlewares.Wrapper(http.MethodPost, middlewares.Auth(router.handler.AddCut)))
	router.mux.HandleFunc(addPlantingEndpoint, middlewares.Wrapper(http.MethodPost, middlewares.Auth(router.handler.AddPlanting)))

	/*** LOGGING ***/
	log.GetLogger().Info("VINEYARD ROUTER")
	log.GetLogger().Info("get all endpoint available at " + prefix + getAllEndpoint)
	log.GetLogger().Info("add endpoint available at " + prefix + addEndpoint)
	log.GetLogger().Info("add trim endpoint available at " + prefix + addTrimEndpoint)
	log.GetLogger().Info("add cut endpoint available at " + prefix + addCutEndpoint)
	log.GetLogger().Info("add planting endpoint available at " + prefix + addPlantingEndpoint)
	log.GetLogger().NewLine()

	return router
}

func (router *VineyardRouter) Mux() *http.ServeMux {
	return router.mux
}
