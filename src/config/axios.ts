import axios, { AxiosRequestConfig } from 'axios';
import { BACKEND_URL } from './app';

const httpClient = axios.create({
  baseURL: BACKEND_URL,
});

httpClient
  .interceptors
  .request
  .use((config: AxiosRequestConfig) => {
    const auth = localStorage.getItem('auth');

    if (auth !== null) {
      const authData = JSON.parse(auth);
      config.headers.Authorization = auth !== null ? `Bearer ${authData.token}` : '';
    }

    return config;
  });

export default httpClient;
