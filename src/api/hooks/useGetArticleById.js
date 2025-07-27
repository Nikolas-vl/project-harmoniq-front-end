import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getArticleById } from '../services/articlesApi';
import { setLoading } from '../../redux/global/globalSlice';

export const useGetArticleById = id => {
  const [article, setArticle] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const fetch = async () => {
      dispatch(setLoading(true));
      try {
        const res = await getArticleById(id);
        setArticle(res.data.article);
      } catch (err) {
        console.error('Failed to fetch article:', err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetch();
  }, [id, dispatch]);

  return { article };
};
