import css from './PopularArticleCard.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import ModalErrorSave from '../../ModalErrorSave/ModalErrorSave';
import {
  selectUserSaved,
  selectUserId,
} from '../../../redux/auth/authSelectors';
import { useSaveArticle } from '../../../api/hooks/users/useSaveArticle';
import { useDeleteSavedArticle } from '../../../api/hooks/users/useDeleteSavedArticle';
import { Link } from 'react-router-dom';
import SaveIcon from '../../../assets/icons/popularArticles/saveIcon.svg?react';

const PopularArticleCard = ({ article, isBeingLoaded }) => {
  const userId = useSelector(selectUserId);
  const savedArticles = useSelector(selectUserSaved);
  const [isSaved, setIsSaved] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { saveArticle, isLoading: isSaving } = useSaveArticle();
  const { deleteArticle, isLoading: isDeleting } = useDeleteSavedArticle();

  useEffect(() => {
    setIsSaved(savedArticles.some(savedId => savedId === article._id));
  }, [article._id, savedArticles]);

  const handleToggleSave = async () => {
    if (!userId) {
      setShowErrorModal(true);
      return;
    }

    try {
      if (isSaved) {
        await deleteArticle(userId, article._id);
        setIsSaved(false);
        toast.success('Removed from saved!');
      } else {
        await saveArticle(userId, article._id);
        setIsSaved(true);
        toast.success('Saved!');
      }
    } catch (err) {
      toast.error('Something went wrong');
      console.error(err);
    }
  };

  if (isBeingLoaded) return <p>✋Loading...✋</p>;

  return (
    <>
      <ModalErrorSave
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
      />
      <div className={css.card_container}>
        {article.img ? (
          <img className={css.card_image} src={article.img} alt={article.desc} />
        ) : (
          <div className={css.unknown_image}>Unknown</div>
        )}
        <div>
          <Link to={`/authors/${article.ownerId}`} className={css.card_author_name}>
            {article?.author || 'Unknown author'}
          </Link>
          <h3 className={css.card_title}>{article.title}</h3>
          <p className={css.card_description}>{article.article}</p>
        </div>

        <div className={css.card_button_container}>
          <Link className={css.load_more_link} to={`/articles/${article._id}`}>
            Learn more
          </Link>
          <button
            onClick={handleToggleSave}
            disabled={isSaving || isDeleting}
            className={`${css.save_button} ${isSaved ? css.saved_button : ''}`}
          >
            {isSaving || isDeleting ? (
              <span style={{ fontSize: '16px', margin: 0 }}>✋</span>
            ) : (
              <SaveIcon />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default PopularArticleCard;
