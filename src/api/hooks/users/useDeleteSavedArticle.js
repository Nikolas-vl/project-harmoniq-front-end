import { useState } from 'react';
import { deleteArticleFromUser } from '../../services/usersApi';
import { useDispatch } from 'react-redux';
import { removeSavedArticleId } from '../../../redux/user/userSlice';

export const useDeleteSavedArticle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const deleteArticle = async (userId, articleId) => {
    setIsLoading(true);
    try {
      await deleteArticleFromUser(userId, articleId);
      dispatch(removeSavedArticleId(articleId));
    } catch (err) {
      console.error('Failed to delete saved article:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteArticle, isLoading };
};
