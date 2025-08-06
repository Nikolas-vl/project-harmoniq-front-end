import css from './Footer.module.css';
import logo from '/src/assets/icons/footer-logo.svg';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../redux/user/userSelectors';

const Footer = () => {
  const userId = useSelector(selectUserId);
  return (
    <>
      <footer className={css.other_container}>
        <div className="container">
          <div className={css.wrapper}>
            <Link className={css.logo_link} to="/">
              <svg width="149" height="36">
                <use href={logo}></use>
              </svg>
            </Link>
            <p className={css.text}>
              &copy; 2025 Harmoniq. All rights reserved.
            </p>
            <ul className={css.link_list}>
              <li className={css.link_list_item}>
                <NavLink className={css.redirect_link} to="/articles">
                  Articles
                </NavLink>
              </li>
              <li className={css.link_list_item}>
                <NavLink
                  className={css.redirect_link}
                  to={userId ? `/authors/${userId}` : `/login`}
                >
                  Account
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
