// components/Header/Header.jsx
import styles from './Header.module.css';
import Navigation from '../Navigation/Navigation';
import logo from '../../assets/icons/header-logo.svg'; 

const Header = () => {
  return (
    <header className={styles.header}>
   
      <img src={logo} alt="Harmoniq Logo" className={styles.logoImage} />
   
   
      <Navigation />
    </header>
  );
};

export default Header;
