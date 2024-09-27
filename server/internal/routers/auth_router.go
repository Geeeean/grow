package routers

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/Geeeean/grow/internal/handlers"
	"github.com/Geeeean/grow/internal/middlewares"
)

type AuthRouter struct {
    mux *http.ServeMux
    handler *handlers.AuthHandler
}

func NewAuthRouter(db *sql.DB) *AuthRouter {
    return &AuthRouter{
        mux: http.NewServeMux(),
        handler: handlers.NewAuthHandler(db),
    }
}

func (router *AuthRouter) Init() {
    router.mux.HandleFunc("/signup", middlewares.Wrapper(router.handler.SignUp))
    router.mux.HandleFunc("/signin", middlewares.Wrapper(router.handler.SignIn))

    fmt.Printf("initialized auth routes (signup signin) 🔓\n")
}

func (router *AuthRouter) Mux() *http.ServeMux {
    return router.mux
}

