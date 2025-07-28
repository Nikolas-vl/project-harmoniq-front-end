import PopularArticlesCardsList from './PopularArticlesCardsList/PopularArticlesCardsList'
import css from './PopularArticles.module.css';
import { Link } from "react-router-dom";

const PopularArticles = () => {
  return (
    <>
      <section className='container'>
        <div className={css.section_container}>
          <div className={css.section_title_link_container}>
            <h2 className={css.section_title}>Popular Articles</h2>
            <div className={css.section_link_svg_container}>
              <Link className={css.redirect_link} to="/articles">
                Go to all Articles
                <svg className={css.svg} width="20" height="19">
                  <use href="/src/assets/icons/redirect-logo.svg#redirect-logo"></use>
                </svg>
              </Link>
            </div>
          </div>
          <PopularArticlesCardsList />
        </div>
      </section>
    </>
  );
};

export default PopularArticles;
