package file

import (
	"os"
)

// Create new folder, in given folder path

func CreateFolder(folderPath string) error {
	err := os.MkdirAll(folderPath, os.ModePerm)
	return err
}

// Remove the folder in given path

func RemoveFolder(folderPath string) error {
	err := os.RemoveAll(folderPath)
	return err
}

// Rename the folder in given path

func RenameFolder(folderPath string, newPath string) error {
	err := os.Rename(folderPath, newPath)
	return err
}

// Get all files from given directory

type File struct {
	name  string
	isDir bool
}

func ReadFolder(folderPath string) ([]File, error) {
	rawFiles, err := os.ReadDir(folderPath)

	var files []File

	for _, file := range rawFiles {
		files = append(files, File{name: file.Name(), isDir: file.IsDir()})
	}

	return files, err
}
