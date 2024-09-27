package main

import (
	"fmt"
	"net/http"

	"github.com/Geeeean/grow/internal/config"
	"github.com/Geeeean/grow/internal/db"
	"github.com/Geeeean/grow/internal/routers"
)

func main() {
    /*** .env LOADING ***/
    if err := config.LoadENV(); err != nil {
        panic(err)
    }

	/*** DB CONNECTION ***/
	db := &db.Connection{}
	err := db.Init()

	if err != nil {
		panic(err)
	}

	defer db.End()

	fmt.Printf("db connection success ✅\n\n")

    /*** ROUTERS INITIALIZATION ***/
    authRouter := routers.NewAuthRouter(db.GetDB())
    authRouter.Init()

    /*** ROUTES HANDLING ***/
    mux := http.NewServeMux()
	mux.Handle("/api/auth/", http.StripPrefix("/api/auth", authRouter.Mux()))

    /*** SERVER START ***/
	port := "3000"
	fmt.Printf("\nserver listening on port %s ✅\n", port)

	if err := http.ListenAndServe(":"+port, mux); err != nil {
		fmt.Printf("\nerror on server start (%s) ❌\n", err)
	}
}
