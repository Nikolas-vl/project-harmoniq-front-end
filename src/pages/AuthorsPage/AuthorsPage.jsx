import { useState, useEffect } from 'react';
import css from './AuthorsPage.module.css';
import { AuthorsList } from '../../modules/AuthorsList/AuthorsList';
import { useGetAllUsers } from '../../api/hooks/users/useGetAllUsers';
import { useSyncQueryParams } from '../../utils/useSyncQueryParams';
import { useSearchParams } from 'react-router-dom';

const AuthorsPage = () => {
  const [page, setPage] = useState(null);
  const [perPage, setPerPage] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [searchParams] = useSearchParams();

  const { users, paginationData, isLoading, queryParams } = useGetAllUsers(
    page,
    perPage
  );

  useEffect(() => {
    const pageFromUrl = Number(searchParams.get('page')) || 1;
    const perPageFromUrl = Number(searchParams.get('perPage')) || 20;
    setPage(pageFromUrl);
    setPerPage(perPageFromUrl);
  }, []);
  useSyncQueryParams(queryParams);

  useEffect(() => {
    if (users && users.length > 0) {
      setAuthors(prev => [...prev, ...users]);
    }
  }, [users]);

  const hasMore = paginationData?.hasNextPage;

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <section className={css.wrapper}>
      <div className="container">
        <div className={css.contentBlock}>
          <h2 className={css.title}>Authors</h2>

          <AuthorsList authors={authors} loading={isLoading} />

          {hasMore && (
            <button
              className={css.loadMore}
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default AuthorsPage;
