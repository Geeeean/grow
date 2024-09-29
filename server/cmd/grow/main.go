package main

import (
	"fmt"
	"net/http"

	"github.com/Geeeean/grow/internal/config"
	"github.com/Geeeean/grow/internal/routers"
	"github.com/Geeeean/grow/internal/storage"
)

func main() {
    /*** .env LOADING ***/
    if err := config.LoadENV(); err != nil {
        panic(err)
    }

	/*** DB CONNECTION ***/
	db := &storage.Connection{}
	err := db.Init()

	if err != nil {
		panic(err)
	}

	defer db.End()

    fmt.Printf("\n✅ DB CONNECTION SUCCESS \n")

    /*** SQLC ***/
    storage := storage.New(db.GetDB())

    /*** ROUTERS INITIALIZATION ***/
    authRouter := routers.NewAuthRouter(storage)
    authRouter.Init()

    /*** ROUTES HANDLING ***/
    mux := http.NewServeMux()
	mux.Handle("/api/auth/", http.StripPrefix("/api/auth", authRouter.Mux()))

    /*** SERVER START ***/
	serverConfig, err := config.LoadServerConfig()
    if err != nil {
        panic(err)
    }

    fmt.Printf("✅ SERVER LISTENING ON PORT %s\n\n", serverConfig.Port)

    err = http.ListenAndServe(":"+serverConfig.Port, mux)
    if err != nil {
	    panic(err)
    }
}
