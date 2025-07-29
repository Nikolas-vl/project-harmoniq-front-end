import { useState, useEffect } from 'react';
import { getUserInfo } from '../../services/usersApi';

export const useGetUserInfo = userId => {
  const [user, setUser] = useState(null);
  const [userArticles, setUserArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetch = async () => {
      setIsLoading(true);
      try {
        const res = await getUserInfo(userId);
        setUser(res.data.data.user);
        setUserArticles(res.data.data.userArticles);
      } catch (err) {
        console.error('Failed to fetch user info:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [userId]);

  return { user, userArticles, isLoading };
};
