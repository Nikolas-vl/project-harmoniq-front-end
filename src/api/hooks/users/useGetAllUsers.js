import { useState, useEffect } from 'react';
import { getAllUsers } from '../../services/usersApi';

export const useGetAllUsers = (page = 1, perPage = 20) => {
  const [users, setUsers] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const res = await getAllUsers({ page, perPage });
        setUsers(res.data.users);
        setPaginationData(res.data.paginationData);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [page, perPage]);

  return { users, paginationData, isLoading };
};
