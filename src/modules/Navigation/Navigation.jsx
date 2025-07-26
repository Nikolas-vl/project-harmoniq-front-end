
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Navigation.module.css';
import logo from '../../assets/icons/header-logo.svg'; 

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
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <nav className={styles.nav}>
     
      {isDesktop && (
        <ul className={styles.linkList}>
          <li><NavLink to="/" className={({ isActive }) => isActive ? styles.active : undefined} onClick={() => setIsMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/articles" className={({ isActive }) => isActive ? styles.active : undefined} onClick={() => setIsMenuOpen(false)}>Articles</NavLink></li>
          <li><NavLink to="/creators" className={({ isActive }) => isActive ? styles.active : undefined} onClick={() => setIsMenuOpen(false)}>Creators</NavLink></li>
        </ul>
      )}

    {/* Кнопки десктоп */}
      {isDesktop && (
        <div className={styles.authButtons}>
          <button
            onClick={handleLoginClick}
            className={`${styles.authButton} ${activeAuthButton === 'login' ? styles.activeAuth : styles.inactiveAuth} ${styles.loginButton}`}
          >
            Log in
          </button>
          <button
            onClick={handleJoinClick}
            className={`${styles.authButton} ${activeAuthButton === 'join' ? styles.activeAuth : styles.inactiveAuth} ${styles.joinButton}`}
          >
            Join now
          </button>
        </div>
      )}

      {/* Кнопка "Join now" для планшетів (в основному хедері, перед гамбургером) */}
      {isTablet && (
        <button
          onClick={handleJoinClick}
          className={`${styles.authButton} ${styles.joinButtonTablet}`}
        >
          Join now
        </button>
      )}


      {(isTablet || isMobile) && (
        <button className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`} onClick={toggleMenu}>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      )}

  
      <div className={`${styles.mobileMenuOverlay} ${isMenuOpen ? styles.showMenu : ''}`}>
        <div className={styles.mobileMenuContent}>
          <header className={styles.mobileMenuHeader}>
            <div className={styles.mobileMenuHeaderContent}>
              <img src={logo} alt="Harmoniq Logo" className={styles.logoImage} />

              <div className={styles.mobileMenuCloseContent}>
              {isTablet && (
                
                <button
                  onClick={handleJoinClick}
                  className={`${styles.authButton} ${styles.joinButtonInModalHeader}`}
                >
                  Join now
                </button>
              )}
              
              <button className={styles.closeButton} onClick={toggleMenu}>
                &#x2715;
              </button>
              </div>
            </div>
          </header>

          <nav className={styles.mobileMenuNavigation}>
            <ul className={styles.mobileLinkList}>
              <li><NavLink to="/" onClick={toggleMenu}>Home</NavLink></li>
              <li><NavLink to="/articles" onClick={toggleMenu}>Articles</NavLink></li>
              <li><NavLink to="/creators" onClick={toggleMenu}>Creators</NavLink></li>
              <li>
                <button onClick={handleLoginClick} className={styles.mobileLoginBtn}>Log in</button>
              </li>
            
              {isMobile && (
                <li>
                  <button onClick={handleJoinClick} className={styles.mobileJoinBtn}>Join now</button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;