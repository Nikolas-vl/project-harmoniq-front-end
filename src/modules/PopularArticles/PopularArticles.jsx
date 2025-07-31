import PopularArticlesList from './PopularArticlesList/PopularArticlesList';
import logo from '/src/assets/icons/redirect-logo.svg';
import css from './PopularArticles.module.css';
import { Link } from 'react-router-dom';

const PopularArticles = () => {
  return (
    <>
      <section id="popular-articles" className={css.section_container}>
        <div className="container">
          <div className={css.section_title_link_container}>
            <h2 className={css.section_title}>Popular Articles</h2>
            <div className={css.section_link_svg_container}>
              <Link className={css.redirect_link} to="/articles">
                Go to all Articles
                <img src={logo} alt="Redirect icon" className={css.svg} />
              </Link>
            </div>
          </div>
          <PopularArticlesList />
        </div>
      </section>
    </>
  );
};

export default PopularArticles;
