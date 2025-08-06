import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import s from './Hero.module.css';
import '../../../src/assets/styles/container.css';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';
import { selectUserId } from '../../redux/user/userSelectors';

const Hero = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);

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
              {isLoggedIn ? (
                <Link to={`/authors/${userId}`} className={s.registerBtn}>
                  My profile
                </Link>
              ) : (
                <Link to="/register" className={s.registerBtn}>
                  Register
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
