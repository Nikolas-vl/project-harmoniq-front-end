import { useState } from 'react';
import ArticlesItem from '../ArticlesItem/ArticlesItem';
import s from './ArticlesList.module.css';
import ModalErrorSave from '../ModalErrorSave/ModalErrorSave';
import { useGetArticles } from '../../api/hooks/articles/useGetArticles';

const ArticlesList = ({ articles, isLoading }) => {
  // todo use isAuthorized from back
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAdd = () => {
    if (!isAuthorized) {
      setShowModal(true);
    } else {
      //todo logic to add to favourites
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
            />
          </li>
        ))}
      </ul>
      <ModalErrorSave isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default ArticlesList;
