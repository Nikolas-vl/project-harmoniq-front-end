import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './ModalErrorSave.module.css';
const ModalErrorSave = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.content}>
        <button onClick={onClose}>
          <svg
            className={s.icon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.25 5.25L12 12M12 12L5.25 18.75M12 12L18.75 18.75M12 12L18.75 5.25"
              stroke="#070721"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className={s.textModalWrapper}>
          <h2 className={s.errorTitle}>Error while saving</h2>
          <p className={s.errorText}>
            To save this article, you need to authorize first
          </p>
          <div className={s.btns}>
            <button onClick={handleLoginClick} className={s.loginBtn}>
              Login
            </button>
            <button onClick={handleRegisterClick} className={s.registerBtn}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalErrorSave;
