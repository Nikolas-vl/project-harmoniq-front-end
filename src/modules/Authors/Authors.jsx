import css from '../PopularArticles/PopularArticles.module.css';
import style from './Authors.module.css';
import AuthorsList from './AuthorsList/AuthorsList';
import logo from '/src/assets/icons/redirect-logo.svg';
import { Link } from 'react-router-dom';

const Authors = () => {
  return (
    <>
      <section className={`container ${style.section_container}`}>
        <div className={css.section_title_link_container}>
          <h2 className={css.section_title}>Top Creators</h2>
          <div className={css.section_link_svg_container}>
            <Link className={css.redirect_link} to="/authors">
              Go to all Creators
              <img src={logo} alt="Redirect icon" className={css.svg} />
            </Link>
          </div>
        </div>
        <AuthorsList />
      </section>
    </>
  );
};

export default Authors;
