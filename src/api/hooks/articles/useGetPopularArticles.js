import { useState, useEffect } from 'react';
import { getPopularArticles } from '../../services/articlesApi';

export const useGetPopularArticles = (limit = 5) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPopularArticles = async () => {
      setIsLoading(true);
      try {
        const response = await getPopularArticles(limit);
        setArticles(response.data.articles);
      } catch (err) {
        console.error('Failed to fetch articles:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularArticles();
  }, [limit]);

  return { articles, isLoading };
};
