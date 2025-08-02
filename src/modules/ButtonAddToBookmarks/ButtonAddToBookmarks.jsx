import css from './ButtonAddToBookmarks.module.css';
import SaveIcon from '../../assets/icons/popularArticles/saveIcon.svg?react';

const ButtonAddToBookmarks = ({ onToggle, isDisabled, isSaved }) => {
  return (
    <button
      onClick={onToggle}
      disabled={isDisabled}
      className={`${css.save_button} ${isSaved ? css.saved_button : ''}`}
    >
      {isDisabled ? (
        <span style={{ fontSize: '16px', margin: 0 }}>✋</span>
      ) : (
        <SaveIcon />
      )}
    </button>
  );
};

export default ButtonAddToBookmarks;
