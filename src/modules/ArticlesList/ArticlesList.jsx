import { useEffect, useState } from 'react';
import ArticlesItem from '../ArticlesItem/ArticlesItem';
import s from './ArticlesList.module.css';
import ModalErrorSave from '../Modal/ModalErrorSave/ModalErrorSave';
import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectSavedArticles,
  selectUserId,
} from '../../redux/auth/authSelectors';
import { useSaveArticle } from '../../api/hooks/users/useSaveArticle';
import toast from 'react-hot-toast';
import { useDeleteSavedArticle } from '../../api/hooks/users/useDeleteSavedArticle';

const ArticlesList = ({ articles }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);
  const savedArticles = useSelector(selectSavedArticles);
  const [savingStates, setSavingStates] = useState({});
  const [savedIds, setSavedIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { saveArticle, isLoading: isSaving } = useSaveArticle();
  const { deleteArticle, isLoading: isDeleting } = useDeleteSavedArticle();

  useEffect(() => {
    if (isLoggedIn && savedArticles) {
      setSavedIds(savedArticles.map(article => article._id));
    }
  }, [isLoggedIn, savedArticles]);

  const handleAdd = async article_id => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }
    setSavingStates(prev => ({ ...prev, [article_id]: true }));

    if (savedIds.includes(article_id)) {
      try {
        await deleteArticle(userId, article_id);
        setSavedIds(prev => prev.filter(id => id !== article_id));
        toast('Removed from favourites');
      } catch (error) {
        console.error(error);
        toast.error('Failed to remove');
      } finally {
        setSavingStates(prev => ({ ...prev, [article_id]: false }));
      }
    } else {
      try {
        await saveArticle(userId, article_id);
        setSavedIds(prev => [...prev, article_id]);
        toast.success('Saved!');
      } catch (error) {
        console.error('Failed to save:', error);
        toast.error('Something went wrong');
      } finally {
        setSavingStates(prev => ({ ...prev, [article_id]: false }));
      }
    }
  };

  return (
    <>
      <ul className={s.list}>
        {articles.map(article => (
          <li key={article._id} className={s.listItem}>
            <ArticlesItem
              title={article.title}
              description={article.desc}
              author={article.author}
              img={article.img}
              handleAdd={handleAdd}
              article_id={article._id}
              isSaved={savedIds.includes(article._id)}
              isSaving={!!savingStates[article._id]}
            />
          </li>
        ))}
      </ul>
      <ModalErrorSave isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default ArticlesList;
