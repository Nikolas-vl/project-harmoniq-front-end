import React from 'react';
import { useSelector } from 'react-redux';
import styles from './UserMenu.module.css';
import { selectUserAvatarUrl, selectUserName } from '../../../../redux/auth/authSelectors';
import exitImg from '../../../../assets/icons/exit-icon.svg'

const UserMenu = ({ onLogoutClick, onUserClick }) => {
  const userName = useSelector(selectUserName);
  const userAvatar = useSelector(selectUserAvatarUrl);

  return (
    <div className={styles.userContainer}>
   <button className={styles.userButton} onClick={onUserClick}>
        {userAvatar ? (
          <img src={userAvatar} alt="Avatar" className={styles.userAvatar} />
        ) : (
          <span className={styles.userLetter}>
            {userName?.charAt(0).toUpperCase()}
          </span>
        )}
      </button>
      <h2 className={styles.userName}>{userName}</h2>
      <span className={styles.userSpan}></span>
      <button className={styles.exitBtn} onClick={onLogoutClick}>
      <img src={exitImg} alt="Exit"  width="24" height="28"/> 
       
      </button>
    </div>
  );
};

export default UserMenu;
