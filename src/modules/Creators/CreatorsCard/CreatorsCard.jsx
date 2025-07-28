import css from './CreatorsCard.module.css';
import { Link } from "react-router-dom";

const CreatorsCard = ({ users }) => {
    return (
        <Link to={`/authors/${users._id}`} className={css.card_container}>
            <img className={css.card_image} src={users.avatarUrl} alt={users.name} />
            <span className={css.author_name}>{users.name}</span>
        </Link>
    );
};

export default CreatorsCard;