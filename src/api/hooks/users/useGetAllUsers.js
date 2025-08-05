import { useState, useEffect } from 'react';
import { getAllUsers } from '../../services/usersApi';
import { useLoader } from '../../../modules/Loader/useLoader';

export const useGetAllUsers = ({
  page = 1,
  perPage = 20,
  filter = 'all',
  limit = null,
} = {}) => {
  const [users, setUsers] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useLoader(isLoading);
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const res = await getAllUsers({ page, perPage, filter, limit });
        setUsers(res.data.data.users);
        setPaginationData(res.data.data.paginationData);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [page, perPage, filter, limit]);

  return {
    users,
    paginationData,
    isLoading,
    queryParams: {
      page,
      perPage,
      filter,
      ...(limit !== null ? { limit } : {}),
    },
  };
};
