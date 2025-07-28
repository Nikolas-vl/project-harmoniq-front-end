import { Link, NavLink } from 'react-router-dom';
import styles from '../Navigation.module.css'

import UserMenu from './UserMenu/UserMenu';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/auth/authSelectors';
import CreateArticle from './CreateArticle/CreateArticleButton';



const MobileMenu = ({ isOpen, isTablet, isMobile, onClose, onLogin, onJoin }) => {

  const isAuthenticated = useSelector(selectIsLoggedIn);

  return (
    <div className={`${styles.mobileMenuOverlay} ${isOpen ? styles.showMenu : ''}`}>
      <div className={styles.mobileMenuContent}>
        {/* Хедер */}
        <header className={styles.mobileMenuHeader}>
          <div className={styles.mobileMenuHeaderContent}>
          <Link className={styles.logoImage}  onClick={onClose} to="/">
              <svg height="40">
                <use href="/src/assets/icons/header-logo.svg#header-logo"></use>
              </svg>
            </Link>
            <div className={styles.mobileMenuCloseContent}>
              {isTablet && (
                 isAuthenticated ? '':
                <button
                  onClick={onJoin}
                  className={`$ ${styles.joinButtonInModalHeader}`} /*{styles.authButton}*/
                >
                  Join now
                </button>
              )}
              <button className={styles.closeButton} onClick={onClose}>
                &#x2715;
              </button>
            </div>
          </div>
        </header>

        {/* Навігація */}
        <nav className={styles.mobileMenuNavigation}>
          <ul className={styles.mobileLinkList}>
            <li><NavLink to="/" onClick={onClose}>Home</NavLink></li>
            <li><NavLink to="/articles" onClick={onClose}>Articles</NavLink></li>
            <li><NavLink to="/creators" onClick={onClose}>Creators</NavLink></li>

            {isTablet && (
              isAuthenticated ? 
              <>
              <li><NavLink to="/profile" onClick={onClose}>My Profile</NavLink></li>
              <li><UserMenu/></li>
              </>
              :
              <>
              <li><button onClick={onLogin} className={styles.mobileLoginBtn}>Log in</button></li>
              
              </>
            )}
           
            {isMobile && (
                isAuthenticated ? 
                <>
                <li><NavLink to="/authors/:id" onClick={onClose}>My Profile</NavLink></li>
                <li><CreateArticle/></li>
                <li> <UserMenu/> </li>
                 </>
                :
                <>
                <li><button onClick={onLogin} className={styles.mobileLoginBtn}>Log in</button></li>
              <li><button onClick={onJoin} className={styles.mobileJoinBtn}>Join now</button></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
