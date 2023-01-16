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
