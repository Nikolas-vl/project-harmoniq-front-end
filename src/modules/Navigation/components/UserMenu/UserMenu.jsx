import React, { useState } from 'react'
 import { useDispatch, useSelector} from 'react-redux'; //, useSelector
 import { useNavigate } from 'react-router-dom';
//  import { selectName } from '../../../redux/auth/authSelectors';

import styles from './UserMenu.module.css'
import { logout } from '../../../../redux/auth/authOperations';
import ModalLogout from '../ModalLogout/ModalLogout';
import { selectUserName } from '../../../../redux/auth/authSelectors';

const UserMenu = () => {
   
   const dispatch = useDispatch();
   const navigate = useNavigate();
    const userName = useSelector(selectUserName); 
   

    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
    const handleOpenLogoutConfirm = () => {
      setIsLogoutConfirmOpen(true);
    };

    const handleCancelLogout = () => {
      setIsLogoutConfirmOpen(false);
    };

    const handleConfirmLogout = async () => {
      try {
        await dispatch(logout()).unwrap(); 
      } catch (error) {
        console.error('Logout failed:', error);
      } finally {
       
        localStorage.clear();
        setIsLogoutConfirmOpen(false);
        navigate('/login');
      }
    };

  return (
    <div className={styles.userContainer}>
    <h2 className={styles.userName}>{userName}</h2>  {/*{userName}*/} 
  
    <span className={styles.userSpan}></span> 
    <button className={styles.exitBtn} onClick={handleOpenLogoutConfirm}> 
    
              <svg width="24" height="24">
                <use href="/src/assets/icons/exit-icon.svg#exit-icon"></use>
              </svg>
            
    </button>

    <ModalLogout
  isOpen={isLogoutConfirmOpen}
  onClose={handleCancelLogout}
  onConfirm={handleConfirmLogout}
/>

    </div>

  )
}

export default UserMenu