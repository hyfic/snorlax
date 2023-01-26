package util

import (
	"fmt"
	"github.com/hyfic/snorlax/api/logger"
	"os"
)

var StorageFolder = "storage/"

func GetStorageFolder() {
	fmt.Print("Enter storage location [default ./storage/]: ")
	fmt.Scanln(&StorageFolder)

	if _, err := os.Stat(StorageFolder); os.IsNotExist(err) {
		err = os.MkdirAll(StorageFolder, os.ModePerm)
		if err != nil {
			logger.Error(fmt.Sprintf("[-] FAILED TO CREATE STORAGE FOLDER %v (%v)", StorageFolder, err.Error()))
			os.Exit(1)
		}
	}
}
