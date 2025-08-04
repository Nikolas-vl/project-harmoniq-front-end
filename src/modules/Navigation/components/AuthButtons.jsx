import { NavLink, useLocation } from 'react-router-dom';
import styles from '../Navigation.module.css';

const AuthButtons = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const isRegister = location.pathname === '/register';

  return (
    <div className={styles.authButtons}>
     
      <NavLink
        to="/login"
        className={`${styles.authButtonLogin} ${isLogin ? styles.activeAuth : styles.inactiveAuth}`}
      >
        Log in
      </NavLink>
      <NavLink
        to="/register"
        className={`${styles.authButtonJoin} ${isRegister ? styles.activeAuth : styles.inactiveAuth}`}
      >
        Join now
      </NavLink>
    </div>
  );
};

export default AuthButtons;
