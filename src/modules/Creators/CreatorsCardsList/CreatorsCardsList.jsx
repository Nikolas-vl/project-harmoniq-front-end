import CreatorsCard from '../CreatorsCard/CreatorsCard';
import css from './CreatorsCardsList.module.css';
import { useGetPopularUsers } from '../../../api/hooks/users/useGetPopularUsers';
import Camera from '../../../assets/icons/createArticlePage/camera.svg?react';
import { Link } from 'react-router-dom';
import cardCss from '../CreatorsCard/CreatorsCard.module.css';

const CreatorsCardsList = () => {
  const { users, isLoading } = useGetPopularUsers(6);

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
          <CreatorsCard users={item} />
        </li>
      ))}
    </ul>
  );
};

export default CreatorsCardsList;
