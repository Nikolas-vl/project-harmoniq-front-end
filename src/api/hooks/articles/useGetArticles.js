import { useEffect, useState } from 'react';
import { getArticles } from '../../services/articlesApi';

export const useGetArticles = (page = 1, perPage = 12) => {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const res = await getArticles({ page, perPage });
        setArticles(res.data.articles);
        setPagination(res.data.paginationData);
      } catch (err) {
        console.error('Failed to fetch articles:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [page, perPage]);

  return { articles, pagination, isLoading };
};
