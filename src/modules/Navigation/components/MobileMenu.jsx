import { Link, NavLink } from 'react-router-dom';
import styles from '../Navigation.module.css';

import UserMenu from './UserMenu/UserMenu';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/auth/authSelectors';
import CreateArticle from './CreateArticle/CreateArticleButton';
import logoImage from '../../../assets/icons/header-logo.svg';

import { selectUserId } from '../../../redux/auth/authSelectors';
import { useEffect } from 'react';
import { useState } from 'react';

const MobileMenu = ({
  isOpen,
  isTablet,
  isMobile,
  onClose,
  onLogin,
  onJoin,
  onLogoutClick,
}) => {
  const isAuthenticated = useSelector(selectIsLoggedIn);

  const userId = useSelector(selectUserId);

  const handleBackdropClick = e => {
    const clickedElement = e.target;

    if (clickedElement.closest('a') || clickedElement.closest('button')) {
      return;
    }

    onClose();
  };
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.classList.add('no-scroll');
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);

      document.body.classList.remove('no-scroll');
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.mobileMenuOverlay} ${
        isOpen ? styles.showMenu : styles.hideMenu
      }`}
      onClick={handleBackdropClick}
    >
      <div className={styles.mobileMenuContent}>
        {/* Навігація */}
        <nav className={styles.mobileMenuNavigation}>
          <ul className={styles.mobileLinkList}>
            <li>
              <NavLink to="/" onClick={onClose}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/articles" onClick={onClose}>
                Articles
              </NavLink>
            </li>
            <li>
              <NavLink to="/authors" onClick={onClose}>
                Creators
              </NavLink>
            </li>

            {isTablet &&
              (isAuthenticated ? (
                <>
                  <li>
                    <NavLink to={`/authors/${userId}`} onClick={onClose}>
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <UserMenu
                      onLogoutClick={onLogoutClick}
                      onUserClick={onClose}
                    />
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button onClick={onLogin} className={styles.mobileLoginBtn}>
                      Log in
                    </button>
                  </li>
                </>
              ))}

            {isMobile &&
              (isAuthenticated ? (
                <>
                  <li>
                    <NavLink to={`/authors/${userId}`} onClick={onClose}>
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <CreateArticle />
                  </li>
                  <li>
                    {' '}
                    <UserMenu
                      onLogoutClick={onLogoutClick}
                      onUserClick={onClose}
                    />{' '}
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button onClick={onLogin} className={styles.mobileLoginBtn}>
                      Log in
                    </button>
                  </li>
                  <li>
                    <button onClick={onJoin} className={styles.mobileJoinBtn}>
                      Join now
                    </button>
                  </li>
                </>
              ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
