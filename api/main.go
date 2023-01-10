package main

import (
	"github.com/hyfic/snorlax/api/router"
	"github.com/hyfic/snorlax/api/util"
)

func main() {
	port := util.GetPort()
	router.StartServer(port)
}
