import CreatorsCard from '../CreatorsCard/CreatorsCard';
import css from './CreatorsCardsList.module.css';
import { useGetPopularUsers } from '../../../api/hooks/users/useGetPopularUsers';

const CreatorsCardsList = () => {
  const { users, isLoading } = useGetPopularUsers(6);

  if (isLoading) {
    return <p>✋Loading...✋</p>;
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
