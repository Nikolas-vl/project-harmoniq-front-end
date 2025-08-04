import ArticleCard from '../ArticleCard/ArticleCard';
import s from './ArticlesList.module.css';

const ArticlesList = ({ articles, isOwnProfile }) => {
  return (
    <>
      <ul className={s.list}>
        {articles.map(article => (
          <li key={article._id} className={s.item}>
            <ArticleCard article={article} isBeingLoaded={''} isOwnArticle={isOwnProfile} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ArticlesList;
