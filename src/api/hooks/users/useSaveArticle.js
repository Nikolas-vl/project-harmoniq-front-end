import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveArticleToUser } from '../../services/usersApi';
import { addSavedArticleId } from '../../../redux/user/userSlice';

export const useSaveArticle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const saveArticle = async (userId, articleId) => {
    setIsLoading(true);
    try {
      await saveArticleToUser(userId, articleId);
      dispatch(addSavedArticleId(articleId));
    } catch (err) {
      console.error('Failed to save article:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { saveArticle, isLoading };
};
