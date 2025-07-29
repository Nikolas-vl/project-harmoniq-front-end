import axiosInstance from '../axios';

export const getArticles = ({ page, perPage } = {}) => {
  return axiosInstance.get('/articles', { params: { page, perPage } });
};
export const getArticleById = id => axiosInstance.get(`/articles/${id}`);
export const deleteArticle = id => axiosInstance.delete(`/articles/${id}`);
export const createArticle = data => axiosInstance.post('/articles', data);

export const getRecommendedArticles = async currentArticleId => {
  try {
    const response = await axiosInstance.get('/articles');

    const articles = response.data.articles || [];

    console.log('Articles for recommendation:', articles);

    const filtered = articles.filter(
      article => article._id !== currentArticleId
    );
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  } catch (error) {
    throw error;
  }
};
