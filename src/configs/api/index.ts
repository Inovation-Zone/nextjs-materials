import axios, { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import { TOAST_CONFIG } from '@/configs/toast';
import { API_BASE_URL, TOKEN } from '@/constants/api';

const httpRequest = axios.create({
  baseURL: API_BASE_URL,
});

type ErrorResponse = {
  message: string;
  details?: string[];
};

type HttpResponse<T> = AxiosResponse<T>;

type HttpError = AxiosError<ErrorResponse>;

httpRequest.interceptors.request.use((config: any) => {
  const token = Cookies.get(TOKEN);
  config.headers.Authorization = token ? `Bearer ${token.replace('""', '')}` : '';

  return config;
});

httpRequest.interceptors.response.use(
  (response: HttpResponse<any>) => response,
  (error: HttpError) => {
    const { response } = error;
    const { status = '', data: { message = '', details = [] } = {} } = response || {};

    const handleHttpError = (statusCode: number, errorMessage: string) => {
      const messageToDisplay = errorMessage || `Error: ${status}`;
      toast.error(messageToDisplay, TOAST_CONFIG);
      return Promise.reject({ message: messageToDisplay });
    };

    switch (status) {
      case 400:
        return handleHttpError(status, details?.[0] || 'Bad Request');
      case 401:
        window.location.href = '/login'; // Redirect to login page
        return handleHttpError(status, 'Unauthorized');
      case 500:
        return handleHttpError(status, details?.[0] || 'Internal Server Error');
      case 502:
        return handleHttpError(status, message || 'Bad Gateway');
      default:
        toast.error(error?.message, TOAST_CONFIG);
        return Promise.reject(error);
    }
  },
);

export default httpRequest;
