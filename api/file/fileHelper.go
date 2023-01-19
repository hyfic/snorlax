package file

import (
	"fmt"
	"os"
)

const StorageFolder = "storage/"

// Create new folder, in given folder path

func CreateFolder(folderPath string) error {
	err := os.MkdirAll(StorageFolder+folderPath, os.ModePerm)
	return err
}

// Remove the folder in given path

func DeleteFolder(folderPath string) error {
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
	Name  string `json:"name" form:"name" binding:"required"`
	IsDir bool   `json:"isDir" form:"name" binding:"required"`
}

func ReadFolder(folderPath string) ([]File, error) {
	rawFiles, err := os.ReadDir(StorageFolder + folderPath)

	var files []File

	for _, file := range rawFiles {
		files = append(files, File{Name: file.Name(), IsDir: file.IsDir()})
	}

	return files, err
}

// Get details of specific files

type FileInfo struct {
	Name         string `json:"name" form:"name" binding:"required"`
	IsDir        bool   `json:"isDir" form:"name" binding:"required"`
	Size         int64  `json:"size" form:"size" binding:"size"`
	LastModified string `json:"lastModified" form:"lastModified" binding:"lastModified"`
}

func GetFileInfo(path string) (FileInfo, error) {
	var fileInfo FileInfo

	fileStat, err := os.Stat(StorageFolder + path)

	if err != nil {
		return fileInfo, err
	}

	fileInfo.Name = fileStat.Name()
	fileInfo.IsDir = fileStat.IsDir()
	fileInfo.Size = fileStat.Size()
	fileInfo.LastModified = fmt.Sprintf("%v", fileStat.ModTime().UTC())

	return fileInfo, err
}

// Rename file

func RenameFile(oldPath string, newPath string) error {
	err := os.Rename(StorageFolder+oldPath, StorageFolder+newPath)
	return err
}

// Delete file

func DeleteFile(path string) error {
	err := os.RemoveAll(StorageFolder + path)
	return err
}
