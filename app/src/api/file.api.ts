import axios from 'axios';

export const getDirectory = (connection: string, path: string) => {
  return axios.get(`${connection}/file/view-folder?path=${path}`);
};
