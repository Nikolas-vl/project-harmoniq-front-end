import CreatorsCard from '../CreatorsCard/CreatorsCard';
import { useGetAllUsers } from '../../../api/hooks/users/useGetAllUsers';
import css from './CreatorsCardsList.module.css';

const CreatorsCardsList = () => {
    const { users, isLoading } = useGetAllUsers(1, 6);

    if (isLoading) {
        return <p>✋Loading...✋</p>
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