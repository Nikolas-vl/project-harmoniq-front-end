import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Navigation.module.css';
import { useSelector} from 'react-redux'; /*, useDispatch */
// import clsx from 'clsx';
import { selectIsLoggedIn, selectName } from '../../redux/auth/authSelectors';
// import { logout } from '../../redux/auth/authOperations';

// import ModalAddArticle from '../ModalAddArticle/ModalAddArticle';
// import ModalLogoutConfirm from '../ModalLogoutConfirm/ModalLogoutConfirm';

import AuthButtons from './components/AuthButtons';
import Burger from './components/Burger';
import MobileMenu from './components/MobileMenu';

function Navigation() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [activeAuthButton, setActiveAuthButton] = useState('join');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ setIsAddArticleOpen] = useState(false); /*isAddArticleOpen,*/
  const [ setIsLogoutConfirmOpen] = useState(false); /*isLogoutConfirmOpen,*/

  const isAuthenticated = useSelector(selectIsLoggedIn);
  const user = useSelector(selectName);

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
  // const handleLogout = async () => {
  //   try {
  //     await dispatch(logout()).unwrap();
  //   } catch (error) {
  //     alert('Logout failed: ' + error.message);
  //   } finally {
  //     setIsLogoutConfirmOpen(false);
  //     localStorage.clear();
  //     navigate('/login');
  //   }
  // };

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
      {isDesktop && !isAuthenticated &&(
        <AuthButtons
          active={activeAuthButton}
          onLogin={handleLoginClick}
          onJoin={handleJoinClick}
        />
      )}

{isAuthenticated && isDesktop && (
        <div className={styles.authenticatedBlock}>
          <button className={styles.createBtn} onClick={() => setIsAddArticleOpen(true)}>Create an article</button>
          <span className={styles.username}>{user?.name}</span>
          <button className={styles.exitBtn} onClick={() => setIsLogoutConfirmOpen(true)}>Exit</button>
        </div>
      )}

      {/* Join now (планшет) */}
      {isTablet && !isAuthenticated ? (
        <button
          onClick={handleJoinClick}
          className={` ${styles.joinButtonTablet}`}
        >
          Join now
        </button>
      ): <button className={styles.createBtn} onClick={() => setIsAddArticleOpen(true)}>Create an article</button>}

      {/* Бургер */}
      {(isTablet || isMobile) &&  (
        <Burger isOpen={isMenuOpen} onClick={toggleMenu} />
      )}

      {/* Мобільне меню */}
      { !isAuthenticated ?<MobileMenu
        isOpen={isMenuOpen}
        isTablet={isTablet}
        isMobile={isMobile}
        onClose={toggleMenu}
        onLogin={handleLoginClick}
        onJoin={handleJoinClick}
      />:<><span className={styles.username}>{user?.name}</span>
      <button className={styles.exitBtn} onClick={() => setIsLogoutConfirmOpen(true)}>Exit</button>
      </>
      }
    </nav>
  );
}

export default Navigation;
