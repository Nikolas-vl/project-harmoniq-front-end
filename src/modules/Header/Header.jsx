import styles from './Header.module.css';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/icons/header-logo.svg';

const Header = () => {
  return (
    <header className={styles.headerBg}>
      <div className={`container ${styles.header}`}>
        <Link className={styles.logoImage} to="/">
          <img src={logoImage} alt="Logo harmohiq" />
        </Link>

        <Navigation />
      </div>
    </header>
  );
};

export default Header;
