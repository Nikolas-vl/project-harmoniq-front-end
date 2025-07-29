import { useParams } from 'react-router-dom';

import styles from './ArticlePage.module.css';
import { useGetArticleById } from '../../api/hooks/articles/useGetArticleById';
import { useGetArticles } from '../../api/hooks/articles/useGetArticles';
import { useSaveArticle } from '../../api/hooks/users/useSaveArticle';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../redux/auth/authSelectors';

const ArticlePage = () => {
  const { id: articleId } = useParams();
  const { article, isLoading } = useGetArticleById(articleId);
  const { articles, isLoading: isRecommendLoading } = useGetArticles();
  console.log('articles:', articles);
  const { saveArticle } = useSaveArticle();

  const currentUser = useSelector(selectUserId);
  const recommendedArticles = articles.slice(0, 3);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!article) {
    return <p>Article not found</p>;
  }
  const {
    title,
    img: imageUrl,
    article: fullText,
    author,
    date: createdAt,
  } = article;
  const handleSave = () => {
    saveArticle(currentUser, articleId);
  };
  return (
    <div className={styles.articlePage}>
      <h1 className={styles.title}>{title}</h1>
      {imageUrl && <img src={imageUrl} alt={title} className={styles.image} />}
      <p className={styles.description}>
        {fullText.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </p>

      <div className={styles.interestedBlock}>
        <div className={styles.meta}>
          <p className={styles.author}>Author: {author}</p>
          <p className={styles.date}>
            Published: {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className={styles.recommendations}>
          <p>You can also be interested in:</p>
          {isRecommendLoading && <p>Loading recommendations...</p>}
          {!recommendedArticles && <p>No recommendations available</p>}
          <ul className={styles.recommendationsList}>
            {recommendedArticles.map(
              ({ _id: recId, title: recTitle, author: ownerId }) => (
                <li key={recId} className={styles.recommendationItem}>
                  <h4>{recTitle}</h4>
                  <p>by {ownerId}</p>
                </li>
              )
            )}
          </ul>
        </div>
        <button
          type="button"
          className={styles.saveButton}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ArticlePage;
