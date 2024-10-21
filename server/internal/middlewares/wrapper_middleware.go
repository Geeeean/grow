package middlewares

import (
	"github.com/Geeeean/grow/internal/api"
	"net/http"
)

func isOriginAllowed(origin string) bool {
	return true
}

func Wrapper(next api.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")

		if isOriginAllowed(origin) {
			w.Header().Set("Access-Control-Allow-Origin", origin)
		}

		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		if err := next(w, r).JSON(w); err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		}
	}
}
