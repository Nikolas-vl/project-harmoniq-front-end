import { useEffect, useState } from 'react';
import { getArticles } from '../../services/articlesApi';

export const useGetArticles = (page = 1, perPage = 12, filter = 'all') => {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const res = await getArticles({ page, perPage, filter });
        setArticles(res.data.data.articles);
        setPagination(res.data.data.paginationData);
      } catch (err) {
        console.error('Failed to fetch articles:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [filter, page, perPage]);

  return {
    articles,
    pagination,
    isLoading,
    queryParams: { page, perPage, filter },
  };
};
