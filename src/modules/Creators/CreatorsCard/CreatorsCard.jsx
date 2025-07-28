import css from './CreatorsCard.module.css';
import { Link } from "react-router-dom";

const CreatorsCard = ({ data }) => {
    return (
        <Link to="/" className={css.card_container}>
            <img className={css.card_image} src={data.image} alt={data.image_desc} />
            <span className={css.author_name}>{data.author}</span>
        </Link>
    );
};

export default CreatorsCard;