import axios from 'axios';

export const getDirectory = (connection: string, path: string) => {
  return axios.get(`${connection}/file/view-folder?path=${path}`);
};

export const getFileInfo = (
  connection: string,
  path: string,
  fileName: string
) => {
  return axios.get(`${connection}/file/get-file-info?path=${path}/${fileName}`);
};

export const deleteFile = (
  connection: string,
  path: string,
  fileName: string
) => {
  return axios.delete(
    `${connection}/file/delete-file?path=${path}/${fileName}`
  );
};

export const renameFile = (connection: string, data: any) => {
  return axios({
    url: `${connection}/file/rename-file`,
    method: 'PUT',
    data,
  });
};

export const createFolder = (
  connection: string,
  path: string,
  folderName: string
) => {
  return axios({
    url: `${connection}/file/create-folder`,
    method: 'POST',
    data: {
      path: `${path}/${folderName}`,
    },
  });
};
