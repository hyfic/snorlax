# SNORLAX API

> File server for snorlax written in golang.

## SETUP

Install packages

```bash
$ go get
```

Run server

```bash
$ go run main.go
```

## API DOCUMENTATION

### `GET`:`/ping`

> To check if server is online or not

**RESPONSE**

```json
{ "message": "ok" }
```

### `GET`:`/file/view-folder`

> Get contents of given folder

**QUERY**

```
?path={folderPath}
```

**RESPONSE**

```json
[
	{
		"name": "fileName",
		"isDir": true/false,
	}
]
```

### `GET`:`/file/get-file-info`

> Get file details for given file

**QUERY**

```
?path={filePath}
```

**RESPONSE**

```json
{
	"name": "fileName",
	"isDir": true/false,
	"size": 100, // file size in bytes
	"lastModified": "last modified time in UTC"
}
```

### `GET`:`/file/download`

> Get direct download link for given file path

**QUERY**

```
?path={filePath}&name={fileName}
```

**RESPONSE**

Direct file link

### `POST`:`/file/create-folder`

> Create folder in given path

**REQUEST BODY**

```json
{
  "path": "folderPath"
}
```

**RESPONSE**

```json
{
  "message": "{folder} created"
}
```

### `POST`:`/file/upload`

> Upload file to server

**REQUEST POSTFORM**

```json
{
  "fileName": "{filename}",
  "filePath": "{filePath}"
}
```

**RESPONSE**

```json
{
  "message": "Uploadded file successfully."
}
```

### `PUT`:`/file/rename-file`

> Rename file/folder

**REQUEST BODY**

```json
{
  "oldPath": "{old file path}",
  "newPath": "{new file path}"
}
```

**RESPONSE**

```json
{
  "message": "Renamed {oldPath} to {newPath}"
}
```

### `DELETE`:`/file/delete-file`

> Delete given file

**QUERY**

```
?path={filePath}
```

**RESPONSE**

```json
{
  "message": "deleted {filePath} successfully"
}
```
