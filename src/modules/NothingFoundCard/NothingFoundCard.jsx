import css from './NothingFoundCard.module.css';
import logo from '/src/assets/icons/alert.svg';
import { Link } from 'react-router-dom';

const NothingFoundCard = ({ title, text, linkText, linkPath }) => {
    return (
        <>
            <div className={css.main_container}>
                <div>
                    <img src={logo} alt="Exclamation mark in the centre of circle" />
                    <h4 className={css.not_found_title}>{title}</h4>
                    <span className={css.not_found_text}>{text}</span>
                </div>
                <Link to={linkPath} className={css.redirect_link}>{linkText}</Link>
            </div>
        </>
    );
};

export default NothingFoundCard;