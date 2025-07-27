import { useParams, useNavigate } from 'react-router-dom';
import { useGetArticleById } from '../../api/hooks/useGetArticleById';
import { useEffect, useState } from 'react';
import { getRecommendedArticles } from '../../api/services/articlesApi';
import styles from './ArticlePage.module.css';

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { article, isLoading, error } = useGetArticleById(id);

  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [recLoading, setRecLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchRecommended = async () => {
      setRecLoading(true);
      try {
        const res = await getRecommendedArticles(id);
        setRecommendedArticles(res);
      } catch (e) {
        console.error('Failed to load recommended articles', e);
      } finally {
        setRecLoading(false);
      }
    };

    fetchRecommended();
  }, [id]);

  const handleSave = () => {
    alert('Article saved to bookmarks!');
  };

  if (isLoading) return <p>Loading article...</p>;
  if (error) return <p>Something went wrong...</p>;
  if (!article) return <p>Article not found</p>;

  const {
    title,
    img: imageUrl,
    article: fullText,
    author,
    date: createdAt,
  } = article;

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
          {recLoading && <p>Loading recommendations...</p>}
          {!recLoading && recommendedArticles.length === 0 && (
            <p>No recommendations available</p>
          )}
          <ul className={styles.recommendationsList}>
            {recommendedArticles.map(
              ({ _id: recId, title: recTitle, author: ownerId }) => (
                <li
                  key={recId}
                  className={styles.recommendationItem}
                  onClick={() => navigate(`/articles/${recId}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter') navigate(`/articles/${recId}`);
                  }}
                >
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
