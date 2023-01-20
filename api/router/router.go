package router

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/hyfic/snorlax/api/file"
	"net/http"
)

var router *gin.Engine

func init() {
	router = gin.Default()
}

func StartServer(port int32) {
	router.Use(cors.Default())
	router.Use(authorizationMiddleware()) // use authorization middleware

	router.GET("/ping", pingRoute) // route to check if server is up

	// Routes
	fileApi := router.Group("file")

	fileApi.POST("/create-folder", createFolderRoute)
	fileApi.PUT("/rename-folder", renameFolderRoute)
	fileApi.DELETE("/delete-folder", deleteFolderRoute)
	fileApi.GET("/view-folder", viewFolderRoute)
	fileApi.GET("/get-file-info", getFileInfoRoute)
	fileApi.GET("/download", downloadRoute)

	fileApi.PUT("/rename-file", renameFileRoute)
	fileApi.DELETE("/delete-file", deleteFileRoute)
	fileApi.POST("/upload", fileUploadRoute)

	fileApi.Use(CORSMiddleware())

	fileApi.Use()

	// set storage as static folder
	router.Static("/storage", "./storage")

	// listen server on port
	addr := fmt.Sprintf(":%v", port)
	router.Run(addr)
}

// Cors middleware

func CORSMiddleware() gin.HandlerFunc {
	return func(context *gin.Context) {
		context.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		context.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		context.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		context.Writer.Header().Set("Access-Control-Allow-Methods", "*")

		context.Next()
	}
}

// Authorization middleware checker
// :- verify authorization token & proceed to route
func authorizationMiddleware() gin.HandlerFunc {
	return func(context *gin.Context) {
		//authorizationHeader := context.Request.Header.Get("authorization")
		//
		//if len(authorizationHeader) == 0 {
		//	context.JSON(http.StatusUnauthorized, gin.H{"message": "authorization header is not provided."})
		//	context.Abort()
		//	return
		//}

		// TODO: check for authorization

		context.Next()
	}
}

// Routes handlers

func pingRoute(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{"message": "ok"})
}

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
	path, pathErr := GetPathFromParams(context)

	if pathErr != nil {
		return
	}

	err := file.DeleteFolder(path)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "deleted " + path + " successfully"})
}

func viewFolderRoute(context *gin.Context) {
	path, pathErr := GetPathFromParams(context)

	if pathErr != nil {
		return
	}

	files, err := file.ReadFolder(path)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, files)
}

func getFileInfoRoute(context *gin.Context) {
	path, pathErr := GetPathFromParams(context)

	if pathErr != nil {
		return
	}

	file, err := file.GetFileInfo(path)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, file)
}

func downloadRoute(context *gin.Context) {
	path := context.Query("path")
	fileName := context.Query("name")

	if len(path) == 0 || len(fileName) == 0 {
		context.JSON(http.StatusBadRequest, gin.H{"message": "path/name is not given."})
		context.Abort()
		return
	}

	context.FileAttachment(file.StorageFolder+path, fileName)
}

func renameFileRoute(context *gin.Context) {
	var requestBody PutRequestBody

	if GetBodyFromRequest(context, &requestBody) != nil {
		return
	}

	err := file.RenameFile(requestBody.OldPath, requestBody.NewPath)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Renamed " + requestBody.OldPath + " to " + requestBody.NewPath})
}

func deleteFileRoute(context *gin.Context) {
	path, pathErr := GetPathFromParams(context)

	if pathErr != nil {
		return
	}

	err := file.DeleteFile(path)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "deleted " + path + " successfully"})
}

func fileUploadRoute(context *gin.Context) {
	fileName := context.PostForm("fileName")
	filePath := context.PostForm("filePath")

	if len(fileName) == 0 || len(filePath) == 0 {
		context.JSON(http.StatusBadRequest, gin.H{"message": "fileName or filePath is not provided"})
		return
	}

	uploadedFile, err := context.FormFile("file")

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	err = context.SaveUploadedFile(uploadedFile, file.StorageFolder+filePath+"/"+fileName)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Uploaded file successfully."})
}
