import axiosInstance from '../axios';

export const getArticles = (page = 1) => {
  return axiosInstance.get(`/articles?page=${page}`);
};
export const getArticleById = id => axiosInstance.get(`/articles/${id}`);
export const deleteArticle = id => axiosInstance.delete(`/articles/${id}`);
export const createArticle = data => axiosInstance.post('/articles', data);
