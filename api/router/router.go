package router

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/hyfic/snorlax/api/file"
	"net/http"
)

var router *gin.Engine

func init() {
	router = gin.Default()
}

func StartServer(port int32) {
	// Routes
	fileApi := router.Group("file")

	fileApi.POST("/create-folder", createFolderRoute)
	fileApi.PUT("/rename-folder", renameFolderRoute)
	fileApi.DELETE("/delete-folder", deleteFolderRoute)
	fileApi.GET("/view-folder", viewFolderRoute)

	fileApi.Use()

	// set storage as static folder
	router.Static("/storage", "./storage")

	// listen server on port
	addr := fmt.Sprintf(":%v", port)
	router.Run(addr)
}

// Routes handlers

func createFolderRoute(context *gin.Context) {
	var requestBody RequestBody
	if GetBodyFromRequest(context, &requestBody) != nil {
		return
	}

	err := file.CreateFolder(requestBody.Path)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": requestBody.Path + " created"})
}

func renameFolderRoute(context *gin.Context) {
	var requestBody PutRequestBody
	if GetBodyFromRequest(context, &requestBody) != nil {
		return
	}

	err := file.RenameFolder(requestBody.OldPath, requestBody.NewPath)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Renamed " + requestBody.OldPath + " to " + requestBody.NewPath})
}

func deleteFolderRoute(context *gin.Context) {
	var requestBody RequestBody
	if GetBodyFromRequest(context, &requestBody) != nil {
		return
	}

	err := file.DeleteFolder(requestBody.Path)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "deleted " + requestBody.Path + " successfully"})
}

func viewFolderRoute(context *gin.Context) {
	var requestBody RequestBody
	if GetBodyFromRequest(context, &requestBody) != nil {
		return
	}

	files, err := file.ReadFolder(requestBody.Path)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, files)
}
