import css from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className={css.other_container}>
        <div className={`container ${css.container}`}>
          <div className={css.wrapper}>
            <Link className={css.logo_link} to="/">
              <svg width="149" height="36">
                <use href="/src/assets/icons/footer-logo.svg#footer-logo"></use>
              </svg>
            </Link>
            <p className={css.text}>&copy; 2025 Harmoniq. All rights reserved.</p>
            <ul className={css.link_list}>
              <li className={css.link_list_item}>
                <Link className={css.redirect_link} to="/">Articles</Link>
              </li>
              <li className={css.link_list_item}>
                <Link className={css.redirect_link} to="/">Account</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
};

export default Footer;
