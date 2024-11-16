package utils

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/google/uuid"
)

func WriteJSON(w http.ResponseWriter, status int, v any) error {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    return json.NewEncoder(w).Encode(v)
}

func GetUserID(r *http.Request) (*uuid.UUID, error) {
    userIDStr, ok := r.Context().Value("id").(string)
    if !ok {
        return nil, errors.New("fail on getting user id from context")
    }

    userID, err := uuid.Parse(userIDStr)
    if err != nil {
        return nil,err
    }

    return &userID, err
}
