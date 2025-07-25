import { Link } from "react-router-dom";
import s from './Hero.module.css';

export const Hero = () => {
  return (
    <section className={s.hero}>
      <div className={s.heroImage}></div>
      <div className={s.content}>
        <h1 className={s.heroTitle}>
          {' '}
          Find your <span className={s.heroTitleSpan}>harmony</span> in
          community
        </h1>
        <div className={s.buttons}>
          <a href="#popular-articles" className={s.articlesBtn}>
            Go to Articles
          </a>
          <Link to="/register" className={s.registerBtn}>
            Register
          </Link>
        </div>
      </div>
    </section>
  );
};
