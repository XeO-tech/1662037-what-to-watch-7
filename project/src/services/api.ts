import axios, { AxiosInstance } from 'axios';

const BACKEND_URL = 'https://7.react.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

const getToken = () => localStorage.getItem('token') ?? '1';

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'x-token': getToken(),
    },
  });

  api.interceptors.request.use((config) =>
    Object.assign({},
      config,
      {
        headers: {
          ...config.headers,
          'x-token': getToken(),
        },
      },
    ),
  );

  return api;
};

