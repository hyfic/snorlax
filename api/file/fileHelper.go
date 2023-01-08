package file

import (
	"os"
)

const StorageFolder = "storage/"

// Create new folder, in given folder path

func CreateFolder(folderPath string) error {
	err := os.MkdirAll(StorageFolder+folderPath, os.ModePerm)
	return err
}

// Remove the folder in given path

func RemoveFolder(folderPath string) error {
	err := os.RemoveAll(StorageFolder + folderPath)
	return err
}

// Rename the folder in given path

func RenameFolder(folderPath string, newPath string) error {
	err := os.Rename(StorageFolder+folderPath, StorageFolder+newPath)
	return err
}

// Get all files from given directory

type File struct {
	name  string
	isDir bool
}

func ReadFolder(folderPath string) ([]File, error) {
	rawFiles, err := os.ReadDir(StorageFolder + folderPath)

	var files []File

	for _, file := range rawFiles {
		files = append(files, File{name: file.Name(), isDir: file.IsDir()})
	}

	return files, err
}

// Rename file

func RenameFile(oldPath string, newPath string) error {
	err := os.Rename(StorageFolder+oldPath, StorageFolder+newPath)
	return err
}

// Delete file

func DeleteFile(path string) error {
	err := os.Remove(StorageFolder + path)
	return err
}
