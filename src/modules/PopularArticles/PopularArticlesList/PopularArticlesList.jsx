import { useEffect, useState } from 'react';
import ArticlesCard from '../../ArticleCard/ArticleCard';
import css from './PopularArticlesList.module.css';
import { useGetPopularArticles } from '../../../api/hooks/articles/useGetPopularArticles';
import NothingFoundCard from '../../NothingFoundCard/NothingFoundCard';

const PopularArticlesList = () => {
  const [visibleCount, setVisibleCount] = useState(4);

  const { articles, isLoading } = useGetPopularArticles(visibleCount);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setVisibleCount(screenWidth >= 1440 ? 3 : 4);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (!isLoading && articles.length === 0) {
    return (
      <NothingFoundCard
        title="Nothing found."
        text="No popular articles available right now."
        linkText="Go to articles"
        linkPath="/articles"
      />
    );
  }

  if (isLoading) {
    return <p>✋Loading...✋</p>;
  }

  return (
    <ul className={css.list}>
      {articles.slice(0, visibleCount).map((item, index) => (
        <li key={index}>
          <ArticlesCard article={item} isBeingLoaded={isLoading} />
        </li>
      ))}
    </ul>
  );
};

export default PopularArticlesList;