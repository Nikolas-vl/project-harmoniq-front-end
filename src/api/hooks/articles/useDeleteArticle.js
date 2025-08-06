import { useDispatch } from 'react-redux';
import { removeUserArticle } from '../../../redux/user/userSlice';
import { useState } from 'react';
import { deleteArticle } from '../../services/articlesApi';

export const useDeleteArticle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const remove = async id => {
    setIsLoading(true);
    try {
      await deleteArticle(id);
      dispatch(removeUserArticle(id));
    } catch (err) {
      console.error('Failed to delete article:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { remove, isLoading };
};
