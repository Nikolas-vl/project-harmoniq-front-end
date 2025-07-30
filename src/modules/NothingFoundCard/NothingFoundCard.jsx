import css from './NothingFoundCard.module.css';
import logo from '/src/assets/icons/alert.svg';

const NothingFoundCard = () => {
    return (
        <>
            <div className={css.main_container}>
                    <img src={logo} alt="Exclamation mark in the centre of circle" />
                    <h4 className={css.not_found_title}>Nothing found.</h4>
                    <span className={css.not_found_text}>Be the first, who create an article</span>
            </div>
        </>
    );
};

export default NothingFoundCard;