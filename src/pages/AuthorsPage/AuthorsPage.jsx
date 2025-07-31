import { useState, useEffect } from 'react';
import css from './AuthorsPage.module.css';
import { AuthorsList } from '../../modules/AuthorsList/AuthorsList';
import { useGetAllUsers } from '../../api/hooks/users/useGetAllUsers';

const AuthorsPage = () => {
  const [page, setPage] = useState(1);
  const [authors, setAuthors] = useState([]);

  const { users, paginationData, isLoading } = useGetAllUsers(page, 20);

  useEffect(() => {
    if (users && users.length > 0) {
      setAuthors(prev => [...prev, ...users]);
    }
  }, [users]);

  const hasMore = paginationData
    ? paginationData.page < paginationData.totalPages
    : false;

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
