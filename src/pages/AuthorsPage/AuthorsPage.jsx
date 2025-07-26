import { useState } from 'react';
import css from './AuthorsPage.module.css';
import { AuthorsItem } from './AuthorsItem';
import { mockAuthors } from './mockAuthors';

const ITEMS_PER_PAGE = 20;

const AuthorsPage = () => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const visibleAuthors = mockAuthors.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };

  return (
    <section className={css.wrapper}>
      <div className={css.contentBlock}>
        <h2 className={css.title}>Authors</h2>

        {visibleAuthors.length === 0 ? (
          <p className={css.noAuthors}>No authors available</p>
        ) : (
          <ul className={css.list}>
            {visibleAuthors.map(author => (
              <AuthorsItem key={author.id} {...author} />
            ))}
          </ul>
        )}
      </div>

      <div className="container">
        {mockAuthors.length > visibleCount && (
          <button className={css.loadMore} onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default AuthorsPage;
