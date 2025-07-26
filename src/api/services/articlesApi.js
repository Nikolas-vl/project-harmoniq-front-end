import axiosInstance from '../axios';

export const getArticles = () => axiosInstance.get('/articles');
export const getArticleById = id => axiosInstance.get(`/articles/${id}`);
export const deleteArticle = id => axiosInstance.delete(`/articles/${id}`);
export const createArticle = data => axiosInstance.post('/articles', data);
