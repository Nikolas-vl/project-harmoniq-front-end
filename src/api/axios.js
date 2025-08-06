import axios from 'axios';

import { navigateTo } from '../utils/navigationService';
import { refreshUser } from '../redux/auth/authOperations';

const instance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    'https://project-harmoniq-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const setAuthHeader = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete instance.defaults.headers.common.Authorization;
};

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const setupInterceptors = store => {
  instance.interceptors.response.use(
    res => res,
    async err => {
      const originalRequest = err.config;

      if (err.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then(token => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              return instance(originalRequest);
            })
            .catch(err => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshResult = await store.dispatch(refreshUser());
          const newAccessToken = refreshResult.payload.accessToken;

          setAuthHeader(newAccessToken);
          processQueue(null, newAccessToken);

          originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
          return instance(originalRequest);
        } catch (error) {
          processQueue(error, null);
          clearAuthHeader();
          navigateTo('/login');
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(err);
    }
  );
};

export default instance;
