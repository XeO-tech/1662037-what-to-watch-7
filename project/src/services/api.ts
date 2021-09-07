import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const BACKEND_URL = 'https://7.react.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

const getToken = () => localStorage.getItem('token') ?? '1';

const HttpCode = {
  UNAUTHORIZED: 401,
};

export const createApi = (onUnauthorized: () => void): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'x-token': getToken(),
    },
  });

  const onSuccess = (response: AxiosResponse) => response;

  const onFail = (err: AxiosError) => {
    const {response} = err;

    if (response) {
      if (response.status === HttpCode.UNAUTHORIZED) {
        onUnauthorized();
      }
    }

    throw err;
  };

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

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

