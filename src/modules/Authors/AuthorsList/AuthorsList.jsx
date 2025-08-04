import AuthorCard from '../AuthorCard/AuthorCard';
import css from './AuthorsList.module.css';
import Camera from '../../../assets/icons/createArticlePage/camera.svg?react';
import { Link } from 'react-router-dom';
import cardCss from '../AuthorCard/AuthorCard.module.css';
import { useGetAllUsers } from '../../../api/hooks/users/useGetAllUsers';

const AuthorsList = () => {
  const { users, isLoading } = useGetAllUsers({ filter: 'popular', limit: 6 });

  if (isLoading) {
    return <p>✋Loading...✋</p>;
  }

  if (!isLoading && users.length === 0) {
    return (
      <Link to="/authors" className={cardCss.card_container}>
        <Camera className={cardCss.unknown_image} />
        <span className={cardCss.author_name}>No creators found here</span>
      </Link>
    );
  }

  return (
    <ul className={css.list}>
      {users.map((item, index) => (
        <li key={index}>
          <AuthorCard users={item} />
        </li>
      ))}
    </ul>
  );
};

export default AuthorsList;
