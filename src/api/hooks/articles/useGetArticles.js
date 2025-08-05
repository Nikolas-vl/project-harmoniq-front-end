import { useEffect, useState } from 'react';
import { getArticles } from '../../services/articlesApi';
import { useLoader } from '../../../modules/Loader/useLoader';

export const useGetArticles = ({
  page = 1,
  perPage = 12,
  filter = 'all',
  limit = null,
} = {}) => {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useLoader(isLoading);
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const res = await getArticles({ page, perPage, filter, limit });
        setArticles(res.data.data.articles);
        setPagination(res.data.data.pagination);
      } catch (err) {
        console.error('Failed to fetch articles:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [page, perPage, filter, limit]);

  return {
    articles,
    pagination,
    isLoading,
    queryParams: {
      page,
      perPage,
      filter,
      ...(limit !== null ? { limit } : {}),
    },
  };
};
