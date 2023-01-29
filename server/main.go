package main

import (
	"fmt"
	"github.com/hyfic/snorlax/api/router"
	"github.com/hyfic/snorlax/api/util"
)

func main() {
	fmt.Println("SNORLAX SERVER v1.0.0 🚀")
	fmt.Println("=======================")

	// get storage folder
	util.GetStorageFolder()
	fmt.Println("=======================")

	// ask custom port
	port := util.GetPort()
	router.StartServer(port)
}
