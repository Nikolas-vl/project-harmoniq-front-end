import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useMemo } from 'react';
import styles from './ArticlePage.module.css';
import { useGetArticleById } from '../../api/hooks/articles/useGetArticleById';
import { useGetArticles } from '../../api/hooks/articles/useGetArticles';
import { useSaveArticle } from '../../api/hooks/users/useSaveArticle';
import { useDeleteSavedArticle } from '../../api/hooks/users/useDeleteSavedArticle';
import { useDeleteArticle } from '../../api/hooks/articles/useDeleteArticle';

import Loader from '../../modules/Loader/Loader';
import ModalErrorSave from '../../modules/ModalErrorSave/ModalErrorSave';
import toast from 'react-hot-toast';
import TopRightIcon from '../../assets/icons/top-right.svg?react';
import ButtonToggleToBookmarks from '../../modules/ButtonToggleToBookmarks/ButtonToggleToBookmarks';
import { useLoader } from '../../modules/Loader/useLoader';
import { selectUserId, selectUserSaved } from '../../redux/user/userSelectors';

const renderArticleContent = text => {
  if (!text) return null;

  const normalizedText = text.replaceAll('/n', '\n').replace(/\\n/g, '\n');

  return <div style={{ whiteSpace: 'pre-wrap' }}>{normalizedText}</div>;
};

const ArticlePage = () => {
  const { id: articleId } = useParams();

  const userId = useSelector(selectUserId);
  const savedArticles = useSelector(selectUserSaved);

  const { article, isLoading: isArticleLoading } = useGetArticleById(articleId);
  const { articles: popularArticles = [] } = useGetArticles({
    filter: 'popular',
    limit: 3,
  });

  useLoader(isArticleLoading);

  const { saveArticle, isLoading: isSaving } = useSaveArticle();
  const { deleteArticle, isLoading: isDeleting } = useDeleteSavedArticle();
  const { remove, isLoading: isDeletingAnArticle } = useDeleteArticle();

  const [showErrorModal, setShowErrorModal] = useState(false);

  const isSaved = useMemo(
    () => savedArticles.includes(articleId),
    [savedArticles, articleId]
  );

  const isOwnArticle = article?.ownerId === userId;

  const isLoaded = isSaving || isDeleting;

  const handleToggleSave = async () => {
    if (!userId) {
      setShowErrorModal(true);
      return;
    }

    try {
      if (isSaved) {
        await deleteArticle(userId, articleId);
        toast.success('Removed from saved!');
      } else {
        await saveArticle(userId, articleId);
        toast.success('Saved!');
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
    } catch (error) {
      console.error('Failed to delete:', error);
      toast.error('Failed to delete article');
    }
  };

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

                  {popularArticles.length === 0 ? (
                    <p>No recommendations available</p>
                  ) : (
                    <ul className={styles.recommendationsList}>
                      {popularArticles.map(
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
                styles={styles.saveButton}
                text={isSaved ? 'Remove from saved' : 'Save'}
              />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlePage;
