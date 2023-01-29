package file

import (
	"fmt"
	"github.com/hyfic/snorlax/api/util"
	"os"
)

// Create new folder, in given folder path

func CreateFolder(folderPath string) error {
	err := os.MkdirAll(util.StorageFolder+folderPath, os.ModePerm)
	return err
}

// Remove the folder in given path

func DeleteFolder(folderPath string) error {
	err := os.RemoveAll(util.StorageFolder + folderPath)
	return err
}

// Rename the folder in given path

func RenameFolder(folderPath string, newPath string) error {
	err := os.Rename(util.StorageFolder+folderPath, util.StorageFolder+newPath)
	return err
}

// Get all files from given directory

type File struct {
	Name  string `json:"name" form:"name" binding:"required"`
	IsDir bool   `json:"isDir" form:"name" binding:"required"`
}

func ReadFolder(folderPath string) ([]File, error) {
	rawFiles, err := os.ReadDir(util.StorageFolder + folderPath)

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

	fileStat, err := os.Stat(util.StorageFolder + path)

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
	err := os.Rename(util.StorageFolder+oldPath, util.StorageFolder+newPath)
	return err
}

// Delete file

func DeleteFile(path string) error {
	err := os.RemoveAll(util.StorageFolder + path)
	return err
}
