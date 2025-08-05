import css from './AuthorCard.module.css';
import { Link } from 'react-router-dom';
import Camera from '../../../assets/icons/createArticlePage/camera.svg?react';
import { MAX_LENGTH } from '../../../constants/authorsItem';

const AuthorCard = ({ users }) => {
  const trimmedName =
    users.name.length > MAX_LENGTH
      ? users.name.slice(0, MAX_LENGTH) + '...'
      : users.name;
  return (
    <Link to={`/authors/${users._id}`} className={css.card_container}>
      {users.avatarUrl ? (
        <img
          className={css.card_image}
          src={users.avatarUrl}
          alt={users.name}
        />
      ) : (
        <Camera className={css.unknown_image} />
      )}
      <span className={css.author_name}>{trimmedName}</span>
    </Link>
  );
};

export default AuthorCard;
