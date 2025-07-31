import { useEffect, useState } from 'react';
import ArticlesItem from '../ArticlesItem/ArticlesItem';
import s from './ArticlesList.module.css';
import ModalErrorSave from '../ModalErrorSave/ModalErrorSave';
import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectSavedArticles,
  selectUserId,
} from '../../redux/auth/authSelectors';
import { useSaveArticle } from '../../api/hooks/users/useSaveArticle';
import toast from 'react-hot-toast';

const ArticlesList = ({ articles, isOwnProfile, activeTab }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);
  const savedArticles = useSelector(selectSavedArticles);
  const [savedIds, setSavedIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { saveArticle, isLoading } = useSaveArticle();

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

    if (savedIds.includes(article_id)) {
      toast('Already in favourites!');
      return;
    }
    try {
      await saveArticle(userId, article_id);
      setSavedIds(prev => [...prev, article_id]);
      toast.success('Saved!');
    } catch (error) {
      console.error('Failed to save:', error);
      toast.error('Something went wrong');
    }
  };

  const normalizedArticles = articles.map(article => {
    const articleId = article._id || article.article_id;
    const author =
      typeof article.author === 'object' && article.author !== null
        ? article.author.name
        : typeof article.author === 'string'
        ? 'Автор'
        : 'Невідомо';

    const image = article.img || article.image || '';
    const description = article.description || article.desc || '';

    return {
      article_id: articleId,
      title: article.title,
      description,
      author,
      img: image,
    };
  });

  return (
    <>
      <ul className={s.list}>
        {normalizedArticles.map(article => (
          <li key={article.article_id} className={s.listItem}>
            <ArticlesItem
              title={article.title}
              description={article.description}
              author={article.author}
              img={article.img}
              handleAdd={handleAdd}
              article_id={article.article_id}
              isOwnProfile={isOwnProfile}
              activeTab={activeTab}
              isSaved={savedIds.includes(article.article_id)}
            />
          </li>
        ))}
      </ul>
      <ModalErrorSave isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default ArticlesList;
