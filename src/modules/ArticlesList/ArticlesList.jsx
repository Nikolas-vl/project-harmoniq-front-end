import { useEffect, useState } from 'react';
import ArticlesItem from '../ArticlesItem/ArticlesItem';
import s from './ArticlesList.module.css';
import ModalErrorSave from '../ModalErrorSave/ModalErrorSave';
import { useGetArticles } from '../../api/hooks/articles/useGetArticles';
import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectSavedArticles,
  selectUserId,
} from '../../redux/auth/authSelectors';
import { useSaveArticle } from '../../api/hooks/users/useSaveArticle';

const ArticlesList = ({ articles }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);
  const savedArticles = useSelector(selectSavedArticles);

  const [showModal, setShowModal] = useState(false);
  const { saveArticle, isLoading } = useSaveArticle();

  const handleAdd = async article_id => {
    if (!isLoggedIn) {
      setShowModal(true);
    } else {
      await saveArticle(userId, article_id);
      return;
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
              isSaved={savedArticles.some(
                articleInList => articleInList._id === article?._id
              )}
              // isSaved={allSavedArticles.includes(article._id)}
            />
          </li>
        ))}
      </ul>
      <ModalErrorSave isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default ArticlesList;
