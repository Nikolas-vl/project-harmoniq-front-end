import { AuthorsItem } from './AuthorsItem';
import css from '../../pages/AuthorsPage/AuthorsPage.module.css';

export const AuthorsList = ({ authors, loading }) => {
  if (authors.length === 0 && !loading) {
    return <p className={css.noAuthors}>No authors available</p>;
  }

  return (
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
  );
};
