package router

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

var router *gin.Engine

func init() {
	router = gin.Default()
}

func StartServer(port int32) {
	// Routes

	// set storage as static folder
	router.Static("/storage", "./storage")

	// listen server on port
	addr := fmt.Sprintf(":%v", port)
	router.Run(addr)
}