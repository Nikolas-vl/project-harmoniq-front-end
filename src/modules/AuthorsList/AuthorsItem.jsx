import { MAX_LENGTH } from '../../constants/authorsItem';
import css from '../../pages/AuthorsPage/AuthorsPage.module.css';
import { useNavigate } from 'react-router-dom';

export const AuthorsItem = ({ id, name, avatar }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/authors/${id}`);
  };

  const trimmedName =
    name.length > MAX_LENGTH ? name.slice(0, MAX_LENGTH) + '...' : name;

  return (
    <li className={css.authorItem} onClick={handleClick}>
      <img src={avatar} alt={name} className={css.avatar} />
      <p className={css.name}>{trimmedName}</p>
    </li>
  );
};
