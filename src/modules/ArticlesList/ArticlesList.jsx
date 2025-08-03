import PopularArticleCard from '../PopularArticles/PopularArticleCard/PopularArticleCard';
import s from './ArticlesList.module.css';

const ArticlesList = ({ articles, isOwnProfile }) => {
  return (
    <>
      <ul className={s.list}>
        {articles.map(article => (
          <li key={article._id} className={s.item}>
            <PopularArticleCard article={article} isBeingLoaded={null} isOwnArticle={isOwnProfile} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ArticlesList;
