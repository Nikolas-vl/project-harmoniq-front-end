import { useState, useEffect } from 'react';
import css from './AuthorsPage.module.css';
import { AuthorsList } from '../../modules/AuthorsList/AuthorsList';
import { useGetAllUsers } from '../../api/hooks/users/useGetAllUsers';

const AuthorsPage = () => {
  const [page, setPage] = useState(1);
  const [authors, setAuthors] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { users, isLoading } = useGetAllUsers(page);

  // Додаємо нових авторів при кожному оновленні `users`
  useEffect(() => {
    if (users && users.length > 0) {
      setAuthors(prev => [...prev, ...users]);
      if (users.length < 20) setHasMore(false); // якщо менше ніж 20 — це остання сторінка
    } else {
      setHasMore(false);
    }
  }, [users]);

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
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
