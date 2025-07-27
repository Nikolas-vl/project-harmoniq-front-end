import { Link } from 'react-router-dom';
import s from './Hero.module.css';
import "../../../src/assets/styles/container.css"

const Hero = () => {
  return (
    <section className={s.hero}>
      <div className="container">
        <div className={s.heroInner}>
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
        </div>
        </div>
    </section> 
  );
};

export default Hero;
