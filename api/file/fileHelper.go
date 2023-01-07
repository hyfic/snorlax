package file

import (
	"os"
)

// Create new folder, in given folder path

func CreateFolder(folderPath string) string {
	err := os.MkdirAll(folderPath, os.ModePerm)

	if err != nil {
		return err.Error()
	}

	return "Created folder successfully."
}
