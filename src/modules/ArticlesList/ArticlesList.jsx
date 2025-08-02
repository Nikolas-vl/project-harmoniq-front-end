import { useEffect, useState } from 'react';
import PopularArticleCard from '../PopularArticles/PopularArticleCard/PopularArticleCard';
import s from './ArticlesList.module.css';
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
  const { saveArticle, isLoading } = useSaveArticle();

  useEffect(() => {
    if (isLoggedIn && savedArticles) {
      setSavedIds(savedArticles.map(article => article._id));
    }
  }, [isLoggedIn, savedArticles]);

  const handleAdd = async article_id => {
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
  
  return (
    <>
      <ul className={s.list}>
        {articles.map(article => (
          <li key={article.article_id}>
            <PopularArticleCard article={article} isBeingLoaded={isLoading} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ArticlesList;
