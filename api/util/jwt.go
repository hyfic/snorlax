package util

import (
	"errors"
	"github.com/golang-jwt/jwt/v4"
)

func GenerateToken(passwordHash string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	tokenString, err := token.SignedString([]byte(passwordHash))
	return tokenString, err
}

func VerifyToken(requestToken string) (bool, error) {
	token, err := jwt.Parse(requestToken, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)

		if !ok {
			return nil, errors.New("failed to verify token")
		}

		return "", nil
	})

	return token.Valid, err
}
