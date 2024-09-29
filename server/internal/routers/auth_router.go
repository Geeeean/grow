package routers

import (
	"fmt"
	"net/http"

	"github.com/Geeeean/grow/internal/handlers"
	"github.com/Geeeean/grow/internal/middlewares"
	"github.com/Geeeean/grow/internal/storage"
)

type AuthRouter struct {
    mux *http.ServeMux
    handler *handlers.AuthHandler
}

func NewAuthRouter(storage *storage.Queries) *AuthRouter {
    return &AuthRouter{
        mux: http.NewServeMux(),
        handler: handlers.NewAuthHandler(storage),
    }
}

func (router *AuthRouter) Init() {
    router.mux.HandleFunc("/signup", middlewares.Wrapper(router.handler.SignUp))
    router.mux.HandleFunc("/signin", middlewares.Wrapper(router.handler.SignIn))
    router.mux.HandleFunc("/info", middlewares.Wrapper(middlewares.Auth(router.handler.GetInfo)))


    fmt.Printf("✅ INITIALIZED AUTH ROUTES\n")
}

func (router *AuthRouter) Mux() *http.ServeMux {
    return router.mux
}

