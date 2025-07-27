
import styles from './Header.module.css';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className={styles.header}>
    <Link className={styles.logoImage} to="/">
              <svg height="40">
                <use href="/src/assets/icons/header-logo.svg#header-logo"></use>
              </svg>
            </Link>
  
      <Navigation />
    </header>
  );
};

export default Header;
