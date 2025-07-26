import { useState, useEffect, useCallback } from 'react';
import { getArticles } from '../services/articlesApi';

export const useGetArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getArticles();
      setArticles(res.data);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { articles, isLoading, refetch: fetch };
};
