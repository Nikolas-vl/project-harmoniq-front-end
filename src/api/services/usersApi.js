import axiosInstance from '../axios';

export const getAllUsers = () => axiosInstance.get('/users');
export const getUserInfo = userId => axiosInstance.get(`/users/${userId}`);
export const saveArticleToUser = (userId, articleId) =>
  axiosInstance.post(`/users/${userId}/save/${articleId}`);
