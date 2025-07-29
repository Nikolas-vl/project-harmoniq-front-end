import { useState, useEffect } from 'react';
import { getPopularUsers } from '../../services/usersApi';

export const useGetPopularUsers = (limit = 3) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPopularUsers = async () => {
      setIsLoading(true);
      try {
        const response = await getPopularUsers(limit);
        setUsers(response.data.data.users);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularUsers();
  }, [limit]);

  return { users, isLoading };
};
