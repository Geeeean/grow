package middlewares

import (
	"net/http"
    "github.com/Geeeean/grow/internal/api"
)

func Wrapper(next api.Handler) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        if err := next(w, r).JSON(w); err != nil {
            http.Error(w, "Internal Server Error", http.StatusInternalServerError)
        }
	}
}
