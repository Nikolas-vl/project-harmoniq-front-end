import axiosInstance from '../axios';

export const getArticles = ({ page, perPage, filter } = {}) => {
  return axiosInstance.get('/articles', {
    params: { page, perPage, filter },
  });
};
export const getArticleById = id => axiosInstance.get(`/articles/${id}`);
export const deleteArticle = id => axiosInstance.delete(`/articles/${id}`);
export const createArticle = data => axiosInstance.post('/articles', data);
export const getPopularArticles = (limit = 3) =>
  axiosInstance.get('/articles/popular', {
    params: { limit },
  });
