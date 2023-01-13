package main

import (
	"github.com/hyfic/snorlax/api/router"
	"github.com/hyfic/snorlax/api/util"
)

func main() {
	// ask custom port
	port := util.GetPort()
	router.StartServer(port)
}
