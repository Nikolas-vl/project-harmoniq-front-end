import { useState, useEffect } from 'react';
import css from './AuthorsPage.module.css';
import { AuthorsItem } from './AuthorsItem';
import { getAllUsers } from '../../api/services/usersApi';

const ITEMS_PER_PAGE = 20;

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers({ page, perPage: ITEMS_PER_PAGE });

      const newAuthors = Array.isArray(res.data.users) ? res.data.users : [];

      setAuthors(prev => [...prev, ...newAuthors]);
      if (newAuthors.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }

      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching authors:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <section className={css.wrapper}>
      <div className="container">
        <div className={css.contentBlock}>
          <h2 className={css.title}>Authors</h2>

          {authors.length === 0 && !loading ? (
            <p className={css.noAuthors}>No authors available</p>
          ) : (
            <ul className={css.list}>
              {authors.map(author => (
                <AuthorsItem
                  key={author._id}
                  id={author._id}
                  name={author.name}
                  avatar={author.avatarUrl}
                />
              ))}
            </ul>
          )}

          {hasMore && (
            <button
              className={css.loadMore}
              onClick={fetchAuthors}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default AuthorsPage;
