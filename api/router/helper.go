package router

import (
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

type FileUploadRequestBody struct { // struct specifically for file upload
	FileName string `json:"name" form:"name" binding:"required"`
	FilePath string `json:"filePath" form:"filePath" binding:"required"`
}

func GetBodyFromRequest[T RequestBody | PutRequestBody | FileUploadRequestBody](context *gin.Context, requestBody *T) error {
	err := context.BindJSON(&requestBody)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	return err
}
