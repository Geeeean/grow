package main

import (
	"net/http"

	"github.com/Geeeean/grow/internal/config"
	"github.com/Geeeean/grow/internal/log"
	"github.com/Geeeean/grow/internal/routers"
	"github.com/Geeeean/grow/internal/storage"
)

func main() {
	/*** LOGGER ***/
	logger, err := log.NewLogger(".log")
	if err != nil {
		panic(err)
	}
	defer logger.Close()

	/*** .env LOADING ***/
	if err := config.LoadENV(); err != nil {
		logger.Error("while loading .env")
		return
	}
	logger.Info("loaded env")

	/*** DB CONNECTION ***/
	db, err := storage.NewConnection()
	if err != nil {
		logger.Error("while connecting to db")
		return
	}
	defer db.End()
	logger.Info("connected to db")

	/*** SQLC ***/
	storage := storage.New(db.GetDB())

	/*** ROUTERS INITIALIZATION ***/
	authRouter := routers.NewAuthRouter(storage)
	authRouterPath := "/api/auth"
	logger.Info("auth router initialized [" + authRouterPath + "]")

	harvestRouter := routers.NewHarvestRouter(storage)
	harvestRouterPath := "/api/harvest"
	logger.Info("harvest router initialized [" + harvestRouterPath + "]")

	clientRouter := routers.NewClientRouter()
    clientRouterPath := "/"
	logger.Info("client router initialized [" + clientRouterPath + "]")

	/*** ROUTES HANDLING ***/
	mux := http.NewServeMux()
	mux.Handle(authRouterPath+"/", http.StripPrefix(authRouterPath, authRouter.Mux()))
	mux.Handle(harvestRouterPath+"/", http.StripPrefix(harvestRouterPath, harvestRouter.Mux()))
	mux.Handle(clientRouterPath, clientRouter.Mux())

	/*** SERVER START ***/
	serverConfig, err := config.LoadServerConfig()
	if err != nil {
		logger.Error("while starting the server")
		return
	}

	logger.Info("server listening on port [" + serverConfig.Port + "]")

	err = http.ListenAndServe(":"+serverConfig.Port, mux)
	if err != nil {
		logger.Error("while serving the mux")
		return
	}
}
