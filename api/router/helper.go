package router

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
)

type RequestBody struct { // struct for request which provide path only
	Path string `json:"path"`
}

type PutRequestBody struct { // struct for request which provide both, oldPath & newPath, used in renaming folder/file
	OldPath string `json:"oldPath"`
	NewPath string `json:"newPath"`
}

func GetBodyFromRequest[T RequestBody | PutRequestBody](context *gin.Context, requestBody *T) error {
	decoder := json.NewDecoder(context.Request.Body)
	err := decoder.Decode(&requestBody)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	return err
}
