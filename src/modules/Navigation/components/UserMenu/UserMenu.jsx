import React from 'react';
import { useSelector } from 'react-redux';
import styles from './UserMenu.module.css';
import exitImg from '../../../../assets/icons/exit-icon.svg';
import { Link } from 'react-router-dom';
import {
  selectUserAvatarUrl,
  selectUserId,
  selectUserName,
} from '../../../../redux/user/userSelectors';

const UserMenu = ({ onLogoutClick, onUserClick }) => {
  const userName = useSelector(selectUserName);
  const userAvatar = useSelector(selectUserAvatarUrl);
  const userId = useSelector(selectUserId);

  return (
    <div className={styles.userContainer}>
      <Link
        to={`/authors/${userId}`}
        className={styles.userLink}
        onClick={onUserClick}
      >
        {userAvatar ? (
          <img src={userAvatar} alt="Avatar" className={styles.userAvatar} />
        ) : (
          <span className={styles.userLetter}>
            {userName?.charAt(0).toUpperCase()}
          </span>
        )}
        <h2 className={styles.userName}>{userName}</h2>
      </Link>
      <span className={styles.userSpan}></span>
      <button className={styles.exitBtn} onClick={onLogoutClick}>
        <img src={exitImg} alt="Exit" width="24" height="28" />
      </button>
    </div>
  );
};

export default UserMenu;
