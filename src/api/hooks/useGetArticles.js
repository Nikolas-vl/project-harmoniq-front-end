import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getArticles } from '../services/articlesApi';
import { setLoading } from '../../redux/global/globalSlice';

export const useGetArticles = () => {
  const [articles, setArticles] = useState([]);
  const dispatch = useDispatch();

  const fetch = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const res = await getArticles();
      setArticles(res.data);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { articles, refetch: fetch };
};
