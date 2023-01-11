package main

import (
	"fmt"
	"github.com/hyfic/snorlax/api/model"
	"github.com/hyfic/snorlax/api/router"
	"github.com/hyfic/snorlax/api/util"
)

func main() {
	if len(model.GetPassword()) == 0 {
		var password string
		fmt.Print("Enter password for server: ")
		fmt.Scanln(&password)
		model.AddPassword(password) // Add password to database
	}

	// ask custom port
	port := util.GetPort()
	router.StartServer(port)
}
