import css from '../PopularArticles/PopularArticles.module.css';
import { Link } from "react-router-dom";
import CreatorsCardsList from './CreatorsCardsList/CreatorsCardsList';

const Creators = () => {
    return (
        <>
            <section className='container'>
                <div className={css.section_container}>
                    <div className={css.section_title_link_container}>
                        <h2 className={css.section_title}>Top Creators</h2>
                        <div className={css.section_link_svg_container}>
                            <Link className={css.redirect_link} to="/authors">
                                Go to all Creators
                                <svg className={css.svg} width="20" height="19">
                                    <use href="/src/assets/icons/redirect-logo.svg#redirect-logo"></use>
                                </svg>
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