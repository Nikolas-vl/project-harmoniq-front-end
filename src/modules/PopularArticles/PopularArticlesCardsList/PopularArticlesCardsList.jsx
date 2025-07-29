import { useEffect, useState } from 'react';
import PopularArticlesCard from '../PopularArticleCard/PopularArticleCard';
import css from './PopularArticlesCardsList.module.css';
import { useGetPopularArticles } from '../../../api/hooks/articles/useGetPopularArticles';

const PopularArticlesCardsList = () => {
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

  if (isLoading) {
    return <p>✋Loading...✋</p>;
  }

  return (
    <ul className={css.list}>
      {articles.slice(0, visibleCount).map((item, index) => (
        <li key={index}>
          <PopularArticlesCard article={item} isLoading={isLoading} />
        </li>
      ))}
    </ul>
  );
};

export default PopularArticlesCardsList;
