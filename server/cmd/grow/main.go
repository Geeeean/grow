package main

import (
	"net/http"

	"github.com/Geeeean/grow/internal/config"
	"github.com/Geeeean/grow/internal/db"
	"github.com/Geeeean/grow/internal/log"
	"github.com/Geeeean/grow/internal/routers"
	"github.com/Geeeean/grow/internal/storage"
)

func main() {
	/*** .env LOADING ***/
	if err := config.LoadENV(); err != nil {
		panic("while loading .env")
	}

	/*** LOGGER ***/
	err := log.Init(".log")
	logger := log.GetLogger()

	if logger == nil {
		panic(err)
	}
	defer logger.Close()

	/*** DB CONNECTION ***/
	db, err := db.NewDB()
	if err != nil {
		logger.Error("while connecting to db:" + err.Error())
		return
	}
	defer db.End()

	/*** DB MIGRATIONS ***/
	err = db.ApplyMigration()
	if err != nil {
		logger.Error("while applying migrations: " + err.Error())
		return
	}

	/*** SQLC ***/
	storage := storage.New(db.GetDB())

	/*** ROUTERS INITIALIZATION ***/
	authRouterPath := "/api/auth"
	authRouter := routers.NewAuthRouter(db.GetDB(), storage, authRouterPath)

	userRouterPath := "/api/user"
	userRouter := routers.NewUserRouter(db.GetDB(), storage, userRouterPath)

	vineyardRouterPath := "/api/vineyard"
	vineyardRouter := routers.NewVineyardRouter(db.GetDB(), storage, vineyardRouterPath)

	harvestRouterPath := "/api/harvest"
	harvestRouter := routers.NewHarvestRouter(db.GetDB(), storage, harvestRouterPath)

	clientRouterPath := "/"
	clientRouter := routers.NewClientRouter(clientRouterPath)

	/*** ROUTES HANDLING ***/
	mux := http.NewServeMux()
	mux.Handle(authRouterPath+"/", http.StripPrefix(authRouterPath, authRouter.Mux()))
	mux.Handle(vineyardRouterPath+"/", http.StripPrefix(vineyardRouterPath, vineyardRouter.Mux()))
	mux.Handle(harvestRouterPath+"/", http.StripPrefix(harvestRouterPath, harvestRouter.Mux()))
	mux.Handle(userRouterPath+"/", http.StripPrefix(userRouterPath, userRouter.Mux()))
	mux.Handle(clientRouterPath, clientRouter.Mux())

	/*** SERVER START ***/
	serverConfig, err := config.LoadServerConfig()
	if err != nil {
		logger.Error("while starting the server: " + err.Error())
		return
	}

	logger.Info("server listening on port [" + serverConfig.Port + "]")

	err = http.ListenAndServe(":"+serverConfig.Port, mux)
	if err != nil {
		logger.Error("while serving the mux: " + err.Error())
		return
	}
}
