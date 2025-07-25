import css from './AuthorsPage.module.css';
import { useNavigate } from 'react-router-dom';

export const AuthorsItem = ({ id, name, avatar }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/authors/${id}`);
  };

  return (
    <li className={css.authorItem} onClick={handleClick}>
      <img src={avatar} alt={name} className={css.avatar} />
      <p className={css.name}>{name}</p>
    </li>
  );
};
