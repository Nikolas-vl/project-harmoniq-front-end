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
  styles = '',
  text,
}) => {
  return isOwnArticle ? (
    <button
      onClick={onDelete}
      disabled={isLoadingDelete}
      className={styles ? styles : css.save_button}
    >
      {isLoadingDelete ? <span className="loading"></span> : <DeleteIcon />}
    </button>
  ) : (
    <button
      onClick={onToggle}
      disabled={isDisabled}
      className={
        styles
          ? styles
          : `${css.save_button} ${isSaved ? css.saved_button : ''}`
      }
    >
      {isDisabled ? (
        <span className="loading"></span>
      ) : (
        <>
          {text} <SaveIcon />
        </>
      )}
    </button>
  );
};

export default ButtonToggleToBookmarks;
