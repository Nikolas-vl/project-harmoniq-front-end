import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Navigation.module.css';


import AuthButtons from './components/AuthButtons';
import Burger from './components/Burger';
import MobileMenu from './components/MobileMenu';

function Navigation() {
  const navigate = useNavigate();
  const [activeAuthButton, setActiveAuthButton] = useState('join');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1440);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1440);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1440);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1440);
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleLoginClick = () => {
    setActiveAuthButton('login');
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleJoinClick = () => {
    setActiveAuthButton('join');
    navigate('/register');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <nav className={styles.nav}>
      {/* Навігація (десктоп) */}
      {isDesktop && (
        <ul className={styles.linkList}>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? styles.active : undefined} >Home</NavLink>
          </li>
          <li>
            <NavLink to="/articles" className={({ isActive }) => isActive ? styles.active : undefined} >Articles</NavLink>
          </li>
          <li>
            <NavLink to="/creators" className={({ isActive }) => isActive ? styles.active : undefined} >Creators</NavLink>
          </li>
        </ul>
      )}

      {/* Auth-кнопки (десктоп) */}
      {isDesktop && (
        <AuthButtons
          active={activeAuthButton}
          onLogin={handleLoginClick}
          onJoin={handleJoinClick}
        />
      )}

      {/* Join now (планшет) */}
      {isTablet && (
        <button
          onClick={handleJoinClick}
          className={` ${styles.joinButtonTablet}`} /*${styles.authButton}*/
        >
          Join now
        </button>
      )}

      {/* Бургер */}
      {(isTablet || isMobile) && (
        <Burger isOpen={isMenuOpen} onClick={toggleMenu} />
      )}

      {/* Мобільне меню */}
      <MobileMenu
        isOpen={isMenuOpen}
        isTablet={isTablet}
        isMobile={isMobile}
        onClose={toggleMenu}
        onLogin={handleLoginClick}
        onJoin={handleJoinClick}
      />
    </nav>
  );
}

export default Navigation;
