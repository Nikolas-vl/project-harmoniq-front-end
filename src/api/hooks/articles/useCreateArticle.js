import { useState } from 'react';
import { createArticle } from '../../services/articlesApi';

export const useCreateArticle = () => {
  const [isLoading, setIsLoading] = useState(false);

  const create = async data => {
    setIsLoading(true);

    try {
      const response = await createArticle(data);
      return response.data.data;
    } catch (err) {
      console.error('Failed to create article:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { create, isLoading };
};
