import React from 'react';
import { useSelector } from 'react-redux';
import styles from './UserMenu.module.css';
import { selectUserName } from '../../../../redux/auth/authSelectors';
import exitImg from '../../../../assets/icons/exit-icon.svg'

const UserMenu = ({ onLogoutClick }) => {
  const userName = useSelector(selectUserName);

  return (
    <div className={styles.userContainer}>
      <h2 className={styles.userName}>{userName}</h2>
      <span className={styles.userSpan}></span>
      <button className={styles.exitBtn} onClick={onLogoutClick}>
      <img src={exitImg} alt="Exit"  width="24" height="28"/> 
       
      </button>
    </div>
  );
};

export default UserMenu;
