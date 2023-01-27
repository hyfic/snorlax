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
		logger.Info(fmt.Sprintf("[i] FOLDER NOT FOUND (%v) CREATING FOLDER..", StorageFolder))
		err = os.MkdirAll(StorageFolder, os.ModePerm)
		if err != nil {
			logger.Error(fmt.Sprintf("[-] FAILED TO CREATE STORAGE FOLDER %v (%v)", StorageFolder, err.Error()))
			os.Exit(1)
		}
		logger.Success(fmt.Sprintf("[+] CREATED FOLDER %v", StorageFolder))
	} else {
		if err != nil {
			logger.Error(fmt.Sprintf("[-] FAILED TO CONNECT STORAGE FOLDER %v (%v)", StorageFolder, err.Error()))
			os.Exit(1)
		}
	}

	logger.Info(fmt.Sprintf("[i] CONNECTED TO STORAGE FOLDER %v", StorageFolder))

}
