import css from '../PopularArticles/PopularArticles.module.css';
import style from './Creators.module.css';
import logo from '/src/assets/icons/redirect-logo.svg';
import { Link } from "react-router-dom";
import CreatorsCardsList from './CreatorsCardsList/CreatorsCardsList';

const Creators = () => {
    return (
        <>
            <section className={style.section_container}>
                <div className='container'>
                    <div className={css.section_title_link_container}>
                        <h2 className={css.section_title}>Top Creators</h2>
                        <div className={css.section_link_svg_container}>
                            <Link className={css.redirect_link} to="/authors">
                                Go to all Creators
                                <img src={logo} alt="Redirect icon" className={css.svg} />
                            </Link>
                        </div>
                    </div>
                    <CreatorsCardsList />
                </div>
            </section>
        </>
    );
};

export default Creators;