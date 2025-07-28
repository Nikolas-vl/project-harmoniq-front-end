import { useState, useEffect, useCallback } from 'react';
import { getArticles } from '../../services/articlesApi';

export const useGetArticles = (page = 1) => {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getArticles(page);
      setArticles(res.data.articles);
      setPagination(res.data.paginationData);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { articles, pagination, isLoading, refetch: fetch };
};
