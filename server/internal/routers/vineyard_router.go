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
    mux *http.ServeMux
    handler *handlers.VineyardHandler
}

func NewVineyardRouter(db *sql.DB, storage *storage.Queries, prefix string) *VineyardRouter {
    router := &VineyardRouter{
        mux: http.NewServeMux(),
        handler: handlers.NewVineyardHandler(db, storage),
    }

    getAllEndpoint := "/get/all"
    addEndpoint := "/add"

    router.mux.HandleFunc(getAllEndpoint, middlewares.Wrapper(middlewares.Auth(router.handler.GetAll)))
    router.mux.HandleFunc(addEndpoint, middlewares.Wrapper(middlewares.Auth(router.handler.Add)))

    /*** LOGGING ***/
    log.GetLogger().Info("VINEYARD ROUTER")
	log.GetLogger().Info("get all endpoint available at " + prefix + getAllEndpoint)
	log.GetLogger().Info("add endpoint available at " + prefix + addEndpoint)
    log.GetLogger().NewLine()

    return router
}

func (router *VineyardRouter) Mux() *http.ServeMux {
    return router.mux
}