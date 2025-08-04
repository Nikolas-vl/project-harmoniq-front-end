import css from './CreatorsCard.module.css';
import { Link } from 'react-router-dom';
import Camera from '../../../assets/icons/createArticlePage/camera.svg?react';

const CreatorsCard = ({ users }) => {
    return (
        <Link to={`/authors/${users._id}`} className={css.card_container}>
            {users.avatarUrl ? (
                <img className={css.card_image} src={users.avatarUrl} alt={users.name} />
            ) : (
                <Camera className={css.unknown_image} />
            )}
            <span className={css.author_name}>{users.name}</span>
        </Link>
    );
};

export default CreatorsCard;