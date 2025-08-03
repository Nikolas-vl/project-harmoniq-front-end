import css from './PopularArticleCard.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import ModalErrorSave from '../../ModalErrorSave/ModalErrorSave';
import ButtonAddToBookmarks from '../../ButtonAddToBookmarks/ButtonAddToBookmarks';
import {
  selectUserSaved,
  selectUserId,
} from '../../../redux/auth/authSelectors';
import { useDeleteArticle } from '../../../api/hooks/articles/useDeleteArticle';
import { useSaveArticle } from '../../../api/hooks/users/useSaveArticle';
import { useDeleteSavedArticle } from '../../../api/hooks/users/useDeleteSavedArticle';
import { Link } from 'react-router-dom';
import Camera from '../../../assets/icons/createArticlePage/camera.svg?react'

const PopularArticleCard = ({ article, isBeingLoaded, isOwnArticle = false }) => {
  const userId = useSelector(selectUserId);
  const savedArticles = useSelector(selectUserSaved);
  const [isSaved, setIsSaved] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { saveArticle, isLoading: isSaving } = useSaveArticle();
  const { deleteArticle, isLoading: isDeleting } = useDeleteSavedArticle();
  const { remove, isLoading: isDeletingAnArticle } = useDeleteArticle();

  const isLoaded = isSaving || isDeleting;

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

  const handleDelete = async () => {
    try {
      await remove(article._id);
      setIsDeleted(true);
      toast.success('Article deleted!');
    
    } catch (error) {
      console.error('Failed to delete:', error);
      toast.error('Failed to delete article');
    }
  };

  if (isBeingLoaded) return <p>✋Loading...✋</p>;
  if (isBeingLoaded || isDeleted) return null;
  if (isDeletingAnArticle) return <p>✋Deleting...✋</p>

  return (
    <>
      <ModalErrorSave
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
      />
      <div className={css.card_container}>
        {article.image ? (
          <img className={css.card_image} src={article.image} alt={article.desc} />
        ) : (
          <Camera className={css.unknown_image} />
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
          <ButtonAddToBookmarks
            onToggle={handleToggleSave}
            isDisabled={isLoaded}
            isSaved={isSaved}
            isOwnArticle={isOwnArticle}
            onDelete={handleDelete}
            isLoadingDelete={isDeletingAnArticle}
          />
        </div>
      </div>
    </>
  );
};

export default PopularArticleCard;
