import css from '../../pages/AuthorsPage/AuthorsPage.module.css';
import { useNavigate } from 'react-router-dom';
import photoPlaceholder from '../../assets/icons/uploadPhoto/photo.svg';

const MAX_LENGTH = 18;

export const AuthorsItem = ({ id, name, avatar }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/authors/${id}`);
  };

  const trimmedName =
    name.length > MAX_LENGTH ? name.slice(0, MAX_LENGTH) + '...' : name;
  const isAvatar = Boolean(avatar);
  return (
    <li className={css.authorItem} onClick={handleClick}>
      {isAvatar ? (
        <img src={avatar} alt={name} className={css.avatar} />
      ) : (
        <div className={css.unknown_avatar}>
          <img src={photoPlaceholder} alt="placeholder" />
        </div>
      )}
      <p className={css.name}>{trimmedName}</p>
    </li>
  );
};
