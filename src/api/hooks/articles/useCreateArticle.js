import { useDispatch } from 'react-redux';
import { createArticle } from '../../services/articlesApi';
import { useState } from 'react';
import { addUserArticle } from '../../../redux/user/userSlice';

export const useCreateArticle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const create = async data => {
    setIsLoading(true);

    try {
      const response = await createArticle(data);
      const newArticle = response.data.data;

      dispatch(addUserArticle(newArticle));

      return newArticle;
    } catch (err) {
      console.error('Failed to create article:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { create, isLoading };
};
