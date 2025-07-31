import { useState } from 'react';
import { deleteArticleFromUser } from '../../services/usersApi';

export const useDeleteSavedArticle = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteArticle = async (userId, articleId) => {
    setIsLoading(true);
    try {
      await deleteArticleFromUser(userId, articleId);
    } catch (err) {
      console.error('Failed to delete saved article:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteArticle, isLoading };
};
