import css from './NothingFoundCard.module.css';
import AlertLogo from '../../assets/icons/alert.svg?react';
import { Link } from 'react-router-dom';

const NothingFoundCard = ({ title, text, linkText, linkPath }) => {
  return (
    <>
      <div className={css.not_found_container}>
        <div className={css.main_container}>
          <div>
            <AlertLogo />
            <h4 className={css.not_found_title}>{title}</h4>
            <span className={css.not_found_text}>{text}</span>
          </div>
          <Link to={linkPath} className={css.redirect_link}>
            {linkText}
          </Link>
        </div>
      </div>
    </>
  );
};

export default NothingFoundCard;
