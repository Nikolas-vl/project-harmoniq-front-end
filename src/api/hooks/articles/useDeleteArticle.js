import { useState } from 'react';
import { deleteArticle } from '../../services/articlesApi';

export const useDeleteArticle = () => {
  const [isLoading, setIsLoading] = useState(false);

  const remove = async id => {
    setIsLoading(true);

    try {
      await deleteArticle(id);
    } catch (err) {
      console.error('Failed to delete article:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { remove, isLoading };
};
