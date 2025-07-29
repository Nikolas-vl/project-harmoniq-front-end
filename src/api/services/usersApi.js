import axiosInstance from '../axios';

export const getAllUsers = ({ page, perPage } = {}) => {
  return axiosInstance.get('/users', { params: { page, perPage } });
};
export const getUserInfo = userId => axiosInstance.get(`/users/${userId}`);
export const getPopularUsers = limit =>
  axiosInstance.get('/users/popular', {
    params: { limit },
  });
export const saveArticleToUser = (userId, articleId) =>
  axiosInstance.post(`/users/${userId}/save/${articleId}`);
