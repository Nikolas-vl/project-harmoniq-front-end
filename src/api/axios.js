import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://project-harmoniq-backend.onrender.com',
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

export default instance;
