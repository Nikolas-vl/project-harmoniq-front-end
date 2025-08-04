import css from './ButtonAddToBookmarks.module.css';
import SaveIcon from '../../assets/icons/popularArticles/saveIcon.svg?react';
import DeleteIcon from '../../assets/icons/deleteArticle/deleteArticle.svg?react';

const ButtonToggleToBookmarks = ({
  onToggle,
  isDisabled,
  isSaved,
  isOwnArticle,
  onDelete,
  isLoadingDelete,
}) => {
  return isOwnArticle ? (
    <button
      onClick={onDelete}
      disabled={isLoadingDelete}
      className={css.save_button}
    >
      <DeleteIcon />
    </button>
  ) : (
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

export default ButtonToggleToBookmarks;
