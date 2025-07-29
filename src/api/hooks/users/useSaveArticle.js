import { useState } from 'react';
import { saveArticleToUser } from '../../services/usersApi';

export const useSaveArticle = () => {
  const [isLoading, setIsLoading] = useState(false);

  const saveArticle = async (userId, articleId) => {
    setIsLoading(true);
    try {
      await saveArticleToUser(userId, articleId);
    } catch (err) {
      console.error('Failed to save article:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { saveArticle, isLoading };
};
