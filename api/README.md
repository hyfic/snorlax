i# SNORLAX API

> File server for snorlax written in golang.

## DOCUMENTATION

1. `POST` : `/file/create-folder`

```json
{
  "path": "{folderpath}/{foldername}"
}
```

2. `PUT` : `/file/rename-folder`

```json
{
  "oldPath": "{current folder path}",
  "newPath": "{new folder path}"
}
```

3. `DELETE` : `/file/delete-folder`

```json
{
  "path": "{folder path}"
}
```

4. `GET` : `/file/view-folder`

```json
// Request
{
  "path": "{folderpath}"
}
```

```json
// Response

[
  {
    name: "string",
    isDir: bool,
  }
]
```

5. `POST` : `/file/upload`

   > Pass file with `file` attribute

1. `GET`: `/storage/{filepath}`

   > Return direct file

1. `PUT` : `/file/rename-file`

```json
{
  "oldPath": "{old full file path}",
  "newPath": "{new full file path}"
}
```

3. `GET` : `/file/view-file/{filepath}`

   > Get direct file

4. `DELETE` : `/file/delete-file`

```json
{
  "path": "{filepath}"
}
```
