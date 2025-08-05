import { NavLink } from 'react-router-dom';
import styles from '../Navigation.module.css';

import UserMenu from './UserMenu/UserMenu';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/auth/authSelectors';
import CreateArticle from './CreateArticle/CreateArticleButton';

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
    let timer;

    if (isOpen) {
      setIsVisible(true);
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1440;

      if (isDesktop && isVisible && isVisible) {
        setIsVisible(false);
        onClose?.();
        document.body.classList.remove('no-scroll');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onClose, isVisible, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.mobileMenuOverlay} ${
        isOpen ? styles.showMenu : styles.hideMenu
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`${styles.mobileMenuContent} ${
          isOpen ? styles.showMenu : styles.hideMenu
        }`}
      >
        {/* Навігація */}

        <nav className={styles.mobileMenuNavigation}>
          <ul className={styles.mobileLinkList}>
            <li>
              <NavLink
                to="/"
                onClick={onClose}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/articles"
                onClick={onClose}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Articles
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/authors"
                onClick={onClose}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Creators
              </NavLink>
            </li>

            {isTablet &&
              (isAuthenticated ? (
                <>
                  <li>
                    <NavLink
                      to={`/authors/${userId}`}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `${styles.link} ${isActive ? styles.active : ''}`
                      }
                    >
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
                    <NavLink
                      to={`/authors/${userId}`}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `${styles.link} ${isActive ? styles.active : ''}`
                      }
                    >
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
