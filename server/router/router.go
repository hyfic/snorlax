package router

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/hyfic/snorlax/api/file"
	"github.com/hyfic/snorlax/api/logger"
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
	fileApi.Static("/storage", util.StorageFolder)

	fileApi.Use()

	// listen server on port
	addr := fmt.Sprintf(":%v", port)

	fmt.Println("=======================")
	logger.Success(fmt.Sprintf("[+] SERVER STARTED AT PORT %v", port))
	logger.Info(fmt.Sprintf("[i] http://127.0.0.1" + addr))

	ips, err := util.LocalIP()

	if err == nil {
		for _, ip := range ips {
			logger.Info(fmt.Sprintf("[i] http://" + ip.String() + addr))
		}
	}
	fmt.Println("=======================")

	router.Run(addr)
}

// Routes handlers

func pingRoute(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{"message": "ok"})
	logger.RouteLog(context.ClientIP(), "GET", "PING", false)
}

func createFolderRoute(context *gin.Context) {
	var requestBody RequestBody
	if GetBodyFromRequest(context, &requestBody) != nil {
		return
	}

	err := file.CreateFolder(requestBody.Path)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		logger.RouteLog(context.ClientIP(), "POST", err.Error(), true)
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": requestBody.Path + " created"})
	logger.RouteLog(context.ClientIP(), "POST", "CREATED FOLDER "+requestBody.Path, false)
}

func viewFolderRoute(context *gin.Context) {
	path, pathErr := GetPathFromParams(context)

	if pathErr != nil {
		return
	}

	files, err := file.ReadFolder(path)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		logger.RouteLog(context.ClientIP(), "GET", err.Error(), true)
		return
	}

	context.JSON(http.StatusOK, files)
	logger.RouteLog(context.ClientIP(), "GET", "VIEW FOLDER "+path, false)
}

func getFileInfoRoute(context *gin.Context) {
	path, pathErr := GetPathFromParams(context)

	if pathErr != nil {
		return
	}

	file, err := file.GetFileInfo(path)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		logger.RouteLog(context.ClientIP(), "GET", err.Error(), true)
		return
	}

	context.JSON(http.StatusOK, file)
	logger.RouteLog(context.ClientIP(), "GET", "GET FILE INFO "+path, false)

}

func downloadRoute(context *gin.Context) {
	path := context.Query("path")
	fileName := context.Query("name")

	if len(path) == 0 || len(fileName) == 0 {
		context.JSON(http.StatusBadRequest, gin.H{"message": "path/name is not given."})
		context.Abort()
		logger.RouteLog(context.ClientIP(), "GET", "path/name IS NOT GIVEN IN REQUEST QUERY", true)
		return
	}

	context.FileAttachment(util.StorageFolder+path, fileName)
	logger.RouteLog(context.ClientIP(), "GET", "DOWNLOAD "+path, false)
}

func renameFileRoute(context *gin.Context) {
	var requestBody PutRequestBody

	if GetBodyFromRequest(context, &requestBody) != nil {
		return
	}

	err := file.RenameFile(requestBody.OldPath, requestBody.NewPath)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		logger.RouteLog(context.ClientIP(), "PUT", err.Error(), true)
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Renamed " + requestBody.OldPath + " to " + requestBody.NewPath})
	logger.RouteLog(context.ClientIP(), "PUT", "RENAMED "+requestBody.OldPath+" TO "+requestBody.NewPath, false)
}

func deleteFileRoute(context *gin.Context) {
	path, pathErr := GetPathFromParams(context)

	if pathErr != nil {
		return
	}

	err := file.DeleteFile(path)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		logger.RouteLog(context.ClientIP(), "DELETE", err.Error(), true)
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "deleted " + path + " successfully"})
	logger.RouteLog(context.ClientIP(), "DELETE", "DELETED "+path, false)
}

func fileUploadRoute(context *gin.Context) {
	fileName := context.PostForm("fileName")
	filePath := context.PostForm("filePath")

	if len(fileName) == 0 || len(filePath) == 0 {
		context.JSON(http.StatusBadRequest, gin.H{"message": "fileName or filePath is not provided"})
		logger.RouteLog(context.ClientIP(), "POST", "fileName OR filePath IS NOT GIVEN IN REQUEST QUERY", true)
		return
	}

	uploadedFile, err := context.FormFile("file")

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		logger.RouteLog(context.ClientIP(), "POST", err.Error(), true)
		return
	}

	err = context.SaveUploadedFile(uploadedFile, util.StorageFolder+filePath+"/"+fileName)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		logger.RouteLog(context.ClientIP(), "POST", err.Error(), true)
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Uploaded file successfully."})
	logger.RouteLog(context.ClientIP(), "POST", "UPLOADED "+fileName+" TO "+filePath, false)
}
