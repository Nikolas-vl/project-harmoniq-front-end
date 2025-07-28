import axiosInstance from '../axios';

export const getAllUsers = ({ page = 1, perPage = 10 } = {}) => {
  return axiosInstance.get(`/users?page=${page}&perPage=${perPage}`);
};
export const getUserInfo = userId => axiosInstance.get(`/users/${userId}`);
export const saveArticleToUser = (userId, articleId) =>
  axiosInstance.post(`/users/${userId}/save/${articleId}`);
