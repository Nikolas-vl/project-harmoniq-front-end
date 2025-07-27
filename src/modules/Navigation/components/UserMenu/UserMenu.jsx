import React, { useState } from 'react'
 import { useDispatch} from 'react-redux'; //, useSelector
 import { useNavigate } from 'react-router-dom';
//  import { selectName } from '../../../redux/auth/authSelectors';

import styles from './UserMenu.module.css'
import { logout } from '../../../../redux/auth/authOperations';
import ModalLogout from '../ModalLogout/ModalLogout';

const UserMenu = () => {
   
   const dispatch = useDispatch();
   const navigate = useNavigate();
    // const userName = useSelector(selectName); 
   

    const [IsLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
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
      
        navigate('/login');
      }
    };

  return (
    <div className={styles.userContainer}>
    <h2 className={styles.userName}>Юзер</h2>  {/*{userName}*/} 
  
    <span className={styles.userSpan}></span> 
    <button className={styles.exitBtn} onClick={handleOpenLogoutConfirm}> 
    
              <svg width="24" height="24">
                <use href="/src/assets/icons/exit-icon.svg#exit-icon"></use>
              </svg>
            
    </button>

    {IsLogoutConfirmOpen && (
        <ModalLogout
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}

    </div>

  )
}

export default UserMenu