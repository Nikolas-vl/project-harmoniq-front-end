import { useState } from 'react';
import ArticlesItem from '../ArticlesItem/ArticlesItem';
import s from './ArticlesList.module.css';
import ModalErrorSave from '../ModalErrorSave/ModalErrorSave';

const ArticlesList = () => {
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
  const articles = [
    {
      id: 1,
      title: 'React Basics',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia placeat odio tempore ratione, et tempora corrupti aut nemo non libero hic at veniam incidunt atque error esse quae, aliquam nisi!',
      author: 'Clark',
    },
    {
      id: 2,
      title: 'React Hooks',
      description: 'Introduction to Hooks.',
      author: 'Landyd',
    },
    {
      id: 3,
      title: 'React Router',
      description: 'Routing in React apps.',
      author: 'Tester',
    },
    {
      id: 4,
      title: 'React Router',
      description: 'Routing in React apps.',
      author: 'Warran',
    },
    {
      id: 5,
      title: 'React Router',
      description: 'Routing in React apps.',
      author: 'Pero',
    },
    {
      id: 6,
      title: 'React Router',
      description: 'Routing in React apps.',
      author: 'Ner',
    },
    {
      id: 7,
      title: 'React Router',
      description: 'Routing in React apps.',
      author: 'Clark',
    },
  ];
  return (
    <>
      <ul className={s.list}>
        {articles.map(article => (
          <li key={article.id} className={s.listItem}>
            <ArticlesItem
              title={article.title}
              description={article.description}
              author={article.author}
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
