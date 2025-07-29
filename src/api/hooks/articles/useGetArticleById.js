import { useState, useEffect } from 'react';
import { getArticleById } from '../../services/articlesApi';

export const useGetArticleById = id => {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetch = async () => {
      setIsLoading(true);
      try {
        const res = await getArticleById(id);
        setArticle(res.data.data.article);
      } catch (err) {
        console.error('Failed to fetch article:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [id]);

  return { article, isLoading };
};
