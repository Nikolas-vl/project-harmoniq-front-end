import { useState } from 'react';
import ArticlesItem from '../ArticlesItem/ArticlesItem';
import s from './ArticlesList.module.css';
import ModalErrorSave from '../ModalErrorSave/ModalErrorSave';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectUserId,
  selectUserSaved,
} from '../../redux/auth/authSelectors';
import { useSaveArticle } from '../../api/hooks/users/useSaveArticle';
import toast from 'react-hot-toast';
import { refreshUser } from '../../redux/auth/authOperations';

const ArticlesList = ({ articles }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);
  const savedArticles = useSelector(selectUserSaved);
  const [showModal, setShowModal] = useState(false);
  const { saveArticle } = useSaveArticle();

  const dispatch = useDispatch();

  const handleAdd = async article_id => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }

    if (savedArticles.includes(article_id)) {
      toast('Already in favourites!');
      return;
    }
    try {
      await saveArticle(userId, article_id);
      dispatch(refreshUser());
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
          <li key={article._id} className={s.listItem}>
            <ArticlesItem
              title={article.title}
              description={article.desc}
              author={article.author}
              img={article.img}
              handleAdd={handleAdd}
              article_id={article._id}
              isSaved={savedArticles.includes(article._id)}
            />
          </li>
        ))}
      </ul>
      <ModalErrorSave isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default ArticlesList;
