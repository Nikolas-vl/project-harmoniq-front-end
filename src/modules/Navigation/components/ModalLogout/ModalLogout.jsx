import React from 'react';
import styles from './ModalLogout.module.css';
import { logout } from '../../../../redux/auth/authOperations';
import { useDispatch } from 'react-redux';

const ModalLogout = ({ isOpen, onClose } ) => {
    const dispatch = useDispatch();
  return (
    <div className={`${styles.logout} ${isOpen ? styles.showMenu : ''}`}>
      <div className={styles.modal}>
      <button className={styles.closeButton} onClick={onClose}>
                &#x2715;
              </button>
        <h2 className={styles.title}>Are you sure?</h2>
        <p className={styles.subtitle}>We will miss you!</p>
        <div className={styles.buttons}>
          <button className={styles.logoutBtn} onClick={() => dispatch(logout())} >

            Log out
          </button>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalLogout;
