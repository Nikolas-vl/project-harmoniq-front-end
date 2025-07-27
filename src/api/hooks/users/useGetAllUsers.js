import { useState, useEffect, useCallback } from 'react';
import { getAllUsers } from '../../services/usersApi';

export const useGetAllUsers = (initialPage = 1, perPage = 10) => {
  const [users, setUsers] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(initialPage);

  const fetch = useCallback(
    async (pageToFetch = page) => {
      setIsLoading(true);
      try {
        const res = await getAllUsers({ page: pageToFetch, perPage });
        setUsers(res.data.users);
        setPaginationData(res.data.paginationData);
        setPage(pageToFetch);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [page, perPage]
  );

  useEffect(() => {
    fetch(page);
  }, [fetch, page]);

  return { users, paginationData, isLoading, refetch: fetch, page, setPage };
};
