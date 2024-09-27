package middlewares

import (
	"context"
	"net/http"

	"github.com/Geeeean/grow/internal/api"
	"github.com/Geeeean/grow/internal/utils"
	"github.com/golang-jwt/jwt/v5"
)

func Auth(next api.Handler) api.Handler {
    return func(w http.ResponseWriter, r *http.Request) api.APIResponse {
        sessionCookie, err := r.Cookie("token")
        if err != nil {
            return api.NewAPIError(http.StatusUnauthorized, "unable to get session cookie")
        }

        err = utils.VerifyToken(sessionCookie.Value)
        if err != nil {
             return api.NewAPIError(http.StatusUnauthorized, "not valid session token (JWT)")
        }

        claims := jwt.MapClaims{}
        token, err := utils.GetPayload(sessionCookie.Value, claims)

        if err != nil || !token.Valid {
            return api.NewAPIError(http.StatusUnauthorized, "not valid session token (JWT)")
        }

        userID := claims["sub"].(string)

        ctx := context.WithValue(r.Context(), "id", userID)

        return next(w, r.WithContext(ctx))
    }
}
