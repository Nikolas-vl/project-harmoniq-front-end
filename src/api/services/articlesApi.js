import axiosInstance from '../axios';

export const getArticles = ({ page, perPage, filter, limit } = {}) => {
  return axiosInstance.get('/articles', {
    params: {
      page,
      perPage,
      filter,
      ...(limit !== undefined ? { limit } : {}),
    },
  });
};

export const getArticleById = id => axiosInstance.get(`/articles/${id}`);

export const deleteArticle = id => axiosInstance.delete(`/articles/${id}`);

export const getPopularArticles = (limit = 3) =>
  axiosInstance.get('/articles/popular', {
    params: { limit },
  });

export const createArticle = data => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  return axiosInstance.post('/articles', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
