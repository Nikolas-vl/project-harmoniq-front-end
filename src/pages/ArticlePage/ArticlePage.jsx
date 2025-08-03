import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './ArticlePage.module.css';

import { useGetArticleById } from '../../api/hooks/articles/useGetArticleById';
import { useGetPopularArticles } from '../../api/hooks/articles/useGetPopularArticles';
import { useSaveArticle } from '../../api/hooks/users/useSaveArticle';
import { selectUserId } from '../../redux/auth/authSelectors';

import Loader from '../../modules/Loader/Loader';

const renderArticleContent = text =>
  text
    .split('\n')
    .filter(line => line.trim() !== '')
    .map((line, index) => <p key={index}>{line}</p>);

const ArticlePage = () => {
  const { id: articleId } = useParams();
  const { article, isLoading } = useGetArticleById(articleId);
  const { articles: recommendedArticles = [], isLoading: isRecommendLoading } =
    useGetPopularArticles(3);
  const { saveArticle } = useSaveArticle();
  const currentUser = useSelector(selectUserId);

  if (isLoading) return <Loader fullScreen />;
  if (!article) return <p>Article not found</p>;

  const handleSave = () => {
    if (!currentUser) {
      alert('Please log in to save articles.');
      return;
    }
    saveArticle(currentUser, articleId);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{article.title}</h1>

      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className={styles.image}
          width="1225"
          height="624"
        />
      )}

      <div className={styles.articleWrapper}>
        <div className={styles.contentBlock}>
          <div className={styles.description}>
            {renderArticleContent(article.article)}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.metaRecommendationsContainer}>
            <div className={styles.meta}>
              <p>
                <strong>Author:</strong>{' '}
                <Link
                  to={`/authors/${article.authorId}`}
                  className={styles.authorLink}
                >
                  {article.author}
                </Link>
              </p>
              <p>
                <strong>Publication date:</strong>{' '}
                {new Date(article.date).toLocaleDateString()}
              </p>
            </div>

            <div className={styles.recommendations}>
              <h3>You might also be interested in</h3>
              {isRecommendLoading ? (
                <p>Loading...</p>
              ) : (
                <ul className={styles.recommendationsList}>
                  {recommendedArticles.map(
                    ({ _id, title, author, authorId }) => (
                      <li key={_id} className={styles.recommendationItem}>
                        <div className={styles.recText}>
                          <p className={styles.recTitle}>{title}</p>
                          <Link
                            to={`/authors/${authorId}`}
                            className={styles.recAuthor}
                          >
                            {author}
                          </Link>
                        </div>
                        <Link
                          to={`/articles/${_id}`}
                          className={styles.arrowButton}
                          aria-label={`Go to article ${title}`}
                        >
                          <svg
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.375 15.125L15.6195 0.875M15.6195 0.875H7.94796M15.6195 0.875L15.6196 8.5466"
                              stroke="#070721"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          </div>

          <button
            type="button"
            className={styles.saveButton}
            onClick={handleSave}
            aria-label="Save article"
          >
            Save
          </button>
        </aside>
      </div>
    </div>
  );
};

export default ArticlePage;
