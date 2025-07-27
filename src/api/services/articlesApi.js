import axiosInstance from '../axios';

export const getArticles = () => axiosInstance.get('/articles');
export const getArticleById = id => axiosInstance.get(`/articles/${id}`);
export const deleteArticle = id => axiosInstance.delete(`/articles/${id}`);
export const createArticle = data => axiosInstance.post('/articles', data);

export const getRecommendedArticles = async currentArticleId => {
  try {
    const response = await axiosInstance.get('/articles');

    const filtered = response.data.filter(
      article => article.id !== currentArticleId
    );
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const recommended = shuffled.slice(0, 3);
    return { data: recommended };
  } catch (error) {
    throw error;
  }
};
