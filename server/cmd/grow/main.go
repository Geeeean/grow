package main

import (
	"fmt"
	"net/http"

	"github.com/Geeeean/grow/internal/db"
	"github.com/Geeeean/grow/internal/handlers"
	"github.com/Geeeean/grow/internal/config"
	middleware "github.com/Geeeean/grow/internal/middlewares"
)

func main() {
    if err := config.LoadENV(); err != nil {
        panic(err)
    }

	//db connection
	db := &db.Connection{}
	err := db.Init()

	if err != nil {
		panic(err)
	}

	defer db.End()

	fmt.Printf("[ DB CONNECTION SUCCESS ]\n")

	//handlers
	userHandler := handlers.NewUserHandler(db.GetDB())

	//routes
	mux := http.NewServeMux()
	mux.HandleFunc("/api/signup", middleware.Wrapper(userHandler.SignUp))
	mux.HandleFunc("/api/signin", middleware.Wrapper(userHandler.SignIn))
	mux.HandleFunc("/api/userinfo", middleware.Wrapper(middleware.Auth(userHandler.GetInfo)))

	port := "3000"
	fmt.Printf("[ SERVER IN ASCOLTO SULLA PORTA %s... ]\n", port)

	if err := http.ListenAndServe(":"+port, mux); err != nil {
		fmt.Printf("[ ERRORE NELL'AVVIO DEL SERVER: %s ]\n", err)
	}
}
