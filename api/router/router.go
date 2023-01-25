package router

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/hyfic/snorlax/api/file"
	"github.com/hyfic/snorlax/api/util"
	"net/http"
)

var router *gin.Engine

func init() {
	gin.SetMode(gin.ReleaseMode)
	router = gin.New()
}

func StartServer(port int32) {
	router.Use(cors.Default())

	router.GET("/ping", pingRoute) // route to check if server is up

	// Routes
	fileApi := router.Group("file")

	fileApi.GET("/view-folder", viewFolderRoute)
	fileApi.GET("/get-file-info", getFileInfoRoute)
	fileApi.GET("/download", downloadRoute)

	fileApi.POST("/create-folder", createFolderRoute)
	fileApi.POST("/upload", fileUploadRoute)

	fileApi.PUT("/rename-file", renameFileRoute)
	fileApi.DELETE("/delete-file", deleteFileRoute)

	// set storage as static folder
	fileApi.Static("/storage", "./storage")

	fileApi.Use()

	// listen server on port
	addr := fmt.Sprintf(":%v", port)

	fmt.Println("=======================")
	fmt.Println("[+] SERVER STARTED AT PORT", port)
	fmt.Println("[i] http://127.0.0.1" + addr)

	ip, err := util.LocalIP()

	if err == nil {
		fmt.Println("[i] http://" + ip.String() + addr)
	}
	fmt.Println("=======================")

	router.Run(addr)
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
