import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useMemo } from 'react';
import styles from './ArticlePage.module.css';
import { useGetArticleById } from '../../api/hooks/articles/useGetArticleById';
import { useGetPopularArticles } from '../../api/hooks/articles/useGetPopularArticles';
import { useSaveArticle } from '../../api/hooks/users/useSaveArticle';
import { useDeleteSavedArticle } from '../../api/hooks/users/useDeleteSavedArticle';
import { useDeleteArticle } from '../../api/hooks/articles/useDeleteArticle';
import { useGetUserInfo } from '../../api/hooks/users/useGetUserInfo';
import { selectUserSaved, selectUserId } from '../../redux/auth/authSelectors';
import { refreshUser } from '../../redux/auth/authOperations';
import Loader from '../../modules/Loader/Loader';
import ModalErrorSave from '../../modules/ModalErrorSave/ModalErrorSave';
import toast from 'react-hot-toast';
import TopRightIcon from '../../assets/icons/top-right.svg?react';
import ButtonToggleToBookmarks from '../../modules/ButtonToggleToBookmarks/ButtonToggleToBookmarks';

const renderArticleContent = text =>
  text.split('/n').map((line, index) => (
    <span key={index}>
      {line.trim()}
      <br />
    </span>
  ));

const RECS_COUNT = 3;

const ArticlePage = () => {
  const { id: articleId } = useParams();
  const dispatch = useDispatch();

  const userId = useSelector(selectUserId);
  const savedArticles = useSelector(selectUserSaved);

  const { article, isLoading: isArticleLoading } = useGetArticleById(articleId);
  const { articles: popularArticles = [], isLoading: isPopularLoading } =
    useGetPopularArticles(8);

  useGetUserInfo(userId);

  const { saveArticle, isLoading: isSaving } = useSaveArticle();
  const { deleteArticle, isLoading: isDeleting } = useDeleteSavedArticle();
  const { remove, isLoading: isDeletingAnArticle } = useDeleteArticle();

  const [isSaved, setIsSaved] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    setIsSaved(savedArticles.some(savedId => savedId === articleId));
  }, [savedArticles, articleId]);

  const isOwnArticle = article?.ownerId === userId;

  const randomRecommendations = useMemo(() => {
    if (!popularArticles.length) return [];

    const filtered = popularArticles.filter(a => a._id !== articleId);
    const shuffled = filtered.sort(() => 0.5 - Math.random());

    return shuffled.slice(0, RECS_COUNT);
  }, [popularArticles, articleId]);

  const isLoaded = isSaving || isDeleting;

  const handleToggleSave = async () => {
    if (!userId) {
      setShowErrorModal(true);
      return;
    }

    try {
      if (isSaved) {
        await deleteArticle(userId, articleId);
        setIsSaved(false);
        toast.success('Removed from saved!');
        dispatch(refreshUser());
      } else {
        await saveArticle(userId, articleId);
        setIsSaved(true);
        toast.success('Saved!');
        dispatch(refreshUser());
      }
    } catch (err) {
      toast.error('Something went wrong');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await remove(articleId);
      toast.success('Article deleted!');
      dispatch(refreshUser());
    } catch (error) {
      console.error('Failed to delete:', error);
      toast.error('Failed to delete article');
    }
  };

  if (isArticleLoading) return <Loader fullScreen />;
  if (!article) return <p>Article not found</p>;

  let publicationDate = 'Unknown date';
  if (article.date) {
    const dateObj = new Date(article.date);
    if (!isNaN(dateObj)) {
      publicationDate = dateObj.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  }

  return (
    <>
      <ModalErrorSave
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
      />

      <div className={`container ${styles.articlePage}`}>
        <div className={styles.page}>
          <h1 className={styles.title}>{article.title}</h1>

          {article.image ? (
            <img
              src={article.image}
              alt={article.title || 'Article image'}
              className={styles.image}
              width="1225"
              height="624"
              loading="lazy"
            />
          ) : (
            <div className={styles.noImagePlaceholder}>No image available</div>
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
                    {article.ownerId ? (
                      <Link
                        to={`/authors/${article.ownerId}`}
                        className={styles.authorLink}
                      >
                        {article.author}
                      </Link>
                    ) : (
                      <span className={styles.authorLink}>
                        {article.author || 'Unknown author'}
                      </span>
                    )}
                  </p>
                  <p>
                    <strong>Publication date:</strong> {publicationDate}
                  </p>
                </div>

                <div className={styles.recommendations}>
                  <h3>You can also interested</h3>
                  {isPopularLoading ? (
                    <p>Loading...</p>
                  ) : randomRecommendations.length === 0 ? (
                    <p>No recommendations available</p>
                  ) : (
                    <ul className={styles.recommendationsList}>
                      {randomRecommendations.map(
                        ({ _id, title, author, ownerId }) => (
                          <li key={_id} className={styles.recommendationItem}>
                            <div className={styles.recText}>
                              <p className={styles.recTitle}>{title}</p>
                              {ownerId ? (
                                <Link
                                  to={`/authors/${ownerId}`}
                                  className={styles.recAuthor}
                                >
                                  {author}
                                </Link>
                              ) : (
                                <span className={styles.recAuthor}>
                                  {author || 'Unknown'}
                                </span>
                              )}
                            </div>
                            <Link
                              to={`/articles/${_id}`}
                              className={styles.arrowButton}
                              aria-label={`Go to article ${title}`}
                            >
                              <TopRightIcon className={styles.icon} />
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              </div>

              <ButtonToggleToBookmarks
                onToggle={handleToggleSave}
                isDisabled={isLoaded}
                isSaved={isSaved}
                isOwnArticle={isOwnArticle}
                onDelete={handleDelete}
                isLoadingDelete={isDeletingAnArticle}
                className={styles.saveButton}
              />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlePage;
