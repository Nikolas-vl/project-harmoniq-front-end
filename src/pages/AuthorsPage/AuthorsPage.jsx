import { useState, useEffect } from 'react';
import css from './AuthorsPage.module.css';
import { AuthorsItem } from './AuthorsItem';
import axios from 'axios';
import { AuthorsList } from '../../modules/AuthorsList/AuthorsList';


const ITEMS_PER_PAGE = 20;

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/users?page=${page}&perPage=${ITEMS_PER_PAGE}`);

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

          

        <AuthorsList authors={authors} loading={loading} />


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
