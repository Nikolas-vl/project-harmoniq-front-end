import styles from './Header.module.css';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/icons/header-logo.svg';

const Header = () => {
  return (
    < div className={styles.headerBg}>
      <div className={`container`}>
        <header className={styles.header}>
          <Link className={styles.logoImage} to="/">
            <img src={logoImage} alt="Logo harmohiq" />
          </Link>

          <Navigation />
          
        </header>

      </div>
    </div>
  );
};

export default Header;
