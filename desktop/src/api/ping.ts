import axios from 'axios';

export const pingServer = (url: string) => {
  return axios.get(url + '/ping');
};
