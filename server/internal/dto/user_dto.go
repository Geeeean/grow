package dto

import (
    "time"
)

type UserSignup struct {
    Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserSignin struct {
    Email string `json:"email"`
    Password string `json:"password"`
}

type UserResponse struct {
    Email string `json:"email"`
    Name  string `json:"name"`
    CreatedAt time.Time `json:"createdAt"`
}
