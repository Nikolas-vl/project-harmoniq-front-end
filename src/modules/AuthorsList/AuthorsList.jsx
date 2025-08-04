import { AuthorsItem } from './AuthorsItem';
import css from '../../pages/AuthorsPage/AuthorsPage.module.css';
import { Link } from 'react-router-dom';
import Camera from '../../assets/icons/createArticlePage/camera.svg?react';

export const AuthorsList = ({ authors, loading }) => {
  if (authors.length === 0 && !loading) {
    return (
      <Link to="/" className={css.authorItem}>
        <Camera className={css.unknown_avatar} />
        <span className={css.name_m}>No authors available</span>
      </Link>
    );
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
