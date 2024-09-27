package api

import (
    "net/http"
    "github.com/Geeeean/grow/internal/utils"
)

type Handler func (w http.ResponseWriter, r *http.Request) APIResponse

type APIResponse interface {
    JSON(w http.ResponseWriter) error
    GetHttpStatus() int
}

type APIResponseBase struct {
    Status     string `json:"status"`
    Message    string `json:"message"`
    httpStatus int    `json:"-"`
}

func (response *APIResponseBase) JSON(w http.ResponseWriter) error {
    return utils.WriteJSON(w, response.httpStatus, response)
}

func (response *APIResponseBase) GetHttpStatus() int {
    return response.httpStatus
}

type APISuccess struct {
    APIResponseBase
    Data interface{} `json:"data,omitempty"`
}

func NewAPISuccess(status int, message string, data any) *APISuccess {
    return &APISuccess{
        APIResponseBase: APIResponseBase{Status: "success", Message: message, httpStatus: status},
        Data:           data,
    }
}

type APIError struct {
    APIResponseBase
}

func NewAPIError(status int, message string) *APIError {
    return &APIError{
        APIResponseBase: APIResponseBase{Status: "error", Message: message, httpStatus: status},
    }
}
