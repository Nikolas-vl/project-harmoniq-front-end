import { useState } from 'react';
import ArticlesItem from '../ArticlesItem/ArticlesItem';
import s from './ArticlesList.module.css';
import ModalErrorSave from '../ModalErrorSave/ModalErrorSave';
import { useGetArticles } from '../../api/hooks/articles/useGetArticles';

const ArticlesList = () => {
  // todo use isAuthorized from back
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { articles, isLoading, refetch } = useGetArticles();
  if (isLoading) return <p>Loading...</p>;
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
              author={article.ownerId}
              img={article.img}
              handleAdd={handleAdd}
            />
          </li>
        ))}
      </ul>
      <ModalErrorSave isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default ArticlesList;
