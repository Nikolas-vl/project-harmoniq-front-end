import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Navigation.module.css';
import { useSelector,useDispatch} from 'react-redux'; 


import { selectIsLoggedIn } from '../../redux/auth/authSelectors';


import AuthButtons from './components/AuthButtons';
import Burger from './components/Burger';
import MobileMenu from './components/MobileMenu';
import UserMenu from './components/UserMenu/UserMenu';
import CreateArticle from './components/CreateArticle/CreateArticleButton';
import { logout } from '../../redux/auth/authOperations';
import ModalLogout from './components/ModalLogout/ModalLogout';

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeAuthButton, setActiveAuthButton] = useState('join');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);


  const isAuthenticated = useSelector(selectIsLoggedIn);


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

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };
  
  const handleLogoutConfirm = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      localStorage.clear();
      setIsLogoutModalOpen(false);
      navigate('/login');
    }
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
            <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''} >Home</NavLink>
          </li>
          <li>
            <NavLink to="/articles" className={({ isActive }) => isActive ? styles.active : ''} >Articles</NavLink>
          </li>
          <li>
            <NavLink to="/authors" className={({ isActive }) => isActive ? styles.active : ''} >Creators</NavLink>
          </li>
        </ul>
      )}

{isDesktop && ( 
        isAuthenticated ? ( 
          <>
            <CreateArticle /> 
            <UserMenu onLogoutClick={handleLogoutClick} /> 
          </>
        ) : ( 
          <AuthButtons
            active={activeAuthButton}
            onLogin={handleLoginClick}
            onJoin={handleJoinClick}
          />
        )
      )}

      {isTablet && ( 
        isAuthenticated ? ( 
          <>
            <CreateArticle/> 
          </>
        ) : ( 
          <button
            onClick={handleJoinClick}
            className={` ${styles.joinButtonTablet}`} 
          >
            Join now
          </button>
        )
      )}

      {/* Бургер */}
      {(isTablet || isMobile) &&  (
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
          <ModalLogout
        isOpen={isLogoutModalOpen} 
         onConfirm={handleLogoutConfirm}
        onClose={handleLogoutCancel}
        
      />
      
    </nav>
       
  );
}

export default Navigation;
