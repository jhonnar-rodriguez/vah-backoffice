import axios, { AxiosRequestConfig } from 'axios';
import { LocalStorageHelper } from '../app/helpers';
import { BACKEND_URL } from './app';

const httpClient = axios.create({
  baseURL: BACKEND_URL,
});

httpClient
  .interceptors
  .request
  .use((config: AxiosRequestConfig) => {
    const token = LocalStorageHelper.getToken();

    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

export default httpClient;
