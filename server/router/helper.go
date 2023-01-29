package router

import (
	"errors"
	"github.com/gin-gonic/gin"
	"net/http"
)

type RequestBody struct { // struct for request which provide path only
	Path string `json:"path" form:"path" binding:"required"`
}

type PutRequestBody struct { // struct for request which provide both, oldPath & newPath, used in renaming folder/file
	OldPath string `json:"oldPath" form:"oldPath" binding:"required"`
	NewPath string `json:"newPath" form:"newPath" binding:"required"`
}

func GetBodyFromRequest[T RequestBody | PutRequestBody](context *gin.Context, requestBody *T) error {
	err := context.BindJSON(&requestBody)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	}

	return err
}

func GetPathFromParams(context *gin.Context) (string, error) {
	path := context.Query("path")

	if len(path) == 0 {
		context.JSON(http.StatusBadRequest, gin.H{"message": "path is not given."})
		context.Abort()

		return "", errors.New("path is not provided")
	}

	return path, nil
}
