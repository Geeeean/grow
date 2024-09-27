package utils

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

var secretKey = []byte(os.Getenv("JWT_SECRET"))

func CreateToken(id uuid.UUID) (string, error) {
    token := jwt.NewWithClaims(
        jwt.SigningMethodHS256,
        jwt.MapClaims{
            "iss": os.Getenv("JWT_ISS"),
            "sub": id,
            "iat": time.Now().Unix(),
            "exp": time.Now().Add(time.Hour * 24 * 7).Unix(),
        })


    tokenString, err := token.SignedString(secretKey)
    if err != nil {
        return "", err
    }

    return tokenString, nil
}

func VerifyToken(tokenString string) error {
   token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
      return secretKey, nil
   })

   if err != nil {
      return err
   }

   if !token.Valid {
      return errors.New("invalid token")
   }

   return nil
}

func GetPayload(sessionToken string, claims jwt.Claims) (*jwt.Token, error) {
    return jwt.ParseWithClaims(sessionToken, claims, func(token *jwt.Token) (interface{}, error) {
        return secretKey, nil
    })
}
