import ArticlesCard from '../../ArticleCard/ArticleCard';
import css from './PopularArticlesList.module.css';

import NothingFoundCard from '../../NothingFoundCard/NothingFoundCard';
import { useGetArticles } from '../../../api/hooks/articles/useGetArticles';

const PopularArticlesList = () => {
  const { articles, isLoading } = useGetArticles({
    filter: 'popular',
    limit: 4,
  });

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
      {articles.map((item, index) => (
        <li key={index} className={index === 3 ? css.hiddenOnDesktop : ''}>
          <ArticlesCard article={item} />
        </li>
      ))}
    </ul>
  );
};

export default PopularArticlesList;
