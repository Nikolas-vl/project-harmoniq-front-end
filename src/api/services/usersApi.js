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
export const updateUserProfile = (userId, data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  return axiosInstance.patch(`/users/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
