package api

import (
	"net/http"

	"github.com/Geeeean/grow/internal/utils"
)

type Handler func (w http.ResponseWriter, r *http.Request) Response

type Response interface {
    JSON(w http.ResponseWriter) error
    GetHttpStatus() int
}

type ResponseBase struct {
    Status     string `json:"status"`
    Message    string `json:"message"`
    Data interface{} `json:"data,omitempty"`
    httpStatus int    `json:"-"`
}

func (response *ResponseBase) JSON(w http.ResponseWriter) error {
    return utils.WriteJSON(w, response.httpStatus, response)
}

func (response *ResponseBase) GetHttpStatus() int {
    return response.httpStatus
}

type Success struct {
    ResponseBase
}

func NewSuccess(status int, message string, data any) *Success {
    return &Success{
        ResponseBase: ResponseBase{Status: "success", Message: message, httpStatus: status, Data: data},
    }
}

type Error struct {
    ResponseBase
}

func NewError(status int, message string) *Error {
    return &Error{
        ResponseBase: ResponseBase{Status: "error", Message: message, httpStatus: status},
    }
}
