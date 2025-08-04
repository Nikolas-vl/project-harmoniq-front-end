import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './ArticlePage.module.css';
import { useGetArticleById } from '../../api/hooks/articles/useGetArticleById';
import { useGetPopularArticles } from '../../api/hooks/articles/useGetPopularArticles';
import { useSaveArticle } from '../../api/hooks/users/useSaveArticle';
import { useGetUserInfo } from '../../api/hooks/users/useGetUserInfo';
import { selectUserId } from '../../redux/auth/authSelectors';
import Loader from '../../modules/Loader/Loader';
import ButtonToggleToBookmarks from '../../modules/ButtonToggleToBookmarks/ButtonToggleToBookmarks';
import toast from 'react-hot-toast';

const renderArticleContent = text =>
  text
    .split('\n')
    .filter(line => line.trim() !== '')
    .map((line, index) => <p key={index}>{line}</p>);

const RECS_PER_PAGE = 3;
const MIN_SWIPE_DISTANCE = 50;

const ArticlePage = () => {
  const { id: articleId } = useParams();
  const currentUser = useSelector(selectUserId);

  // Получаем статью и популярные статьи
  const { article, isLoading: isArticleLoading } = useGetArticleById(articleId);
  const { articles: popularArticles = [], isLoading: isPopularLoading } =
    useGetPopularArticles(8);

  // Получаем инфо по пользователю, в т.ч. сохранённые статьи
  const { savedArticles = [] } = useGetUserInfo(currentUser);

  const { saveArticle } = useSaveArticle();

  const [isSaved, setIsSaved] = useState(false);
  const [recPageIndex, setRecPageIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const containerRef = useRef(null);
  const touchStartX = useRef(null);

  // Сброс страницы рекомендаций при смене статьи
  useEffect(() => {
    setRecPageIndex(0);
  }, [articleId]);

  // Обновляем статус сохранения при изменении savedArticles или articleId
  useEffect(() => {
    setIsSaved(savedArticles.some(a => a._id === articleId));
  }, [savedArticles, articleId]);

  // Определяем авторство статьи
  const isOwnArticle = article?.ownerId === currentUser;

  // Пагинация рекомендаций
  const maxPageIndex = Math.max(
    0,
    Math.ceil(popularArticles.length / RECS_PER_PAGE) - 1
  );
  const start = recPageIndex * RECS_PER_PAGE;
  const currentRecommendations = popularArticles.slice(
    start,
    start + RECS_PER_PAGE
  );
  const hasPrev = recPageIndex > 0;
  const hasNext = recPageIndex < maxPageIndex;

  // Анимация переключения рекомендаций
  const animateToggle = useCallback(callback => {
    if (!containerRef.current) {
      callback();
      return;
    }

    setAnimating(true);

    const el = containerRef.current;
    const originalHeight = el.scrollHeight;
    el.style.height = `${originalHeight}px`;

    void el.offsetHeight; // trigger reflow

    el.style.transition = 'height 300ms ease, opacity 300ms ease';
    el.style.height = '0px';
    el.style.opacity = '0';

    setTimeout(() => {
      callback();

      requestAnimationFrame(() => {
        const newHeight = el.scrollHeight;
        el.style.height = `${newHeight}px`;
        el.style.opacity = '1';
      });

      setTimeout(() => {
        el.style.height = 'auto';
        el.style.transition = '';
        setAnimating(false);
      }, 300);
    }, 300);
  }, []);

  const handlePrev = useCallback(() => {
    if (!hasPrev || animating) return;
    animateToggle(() => setRecPageIndex(prev => prev - 1));
  }, [hasPrev, animating, animateToggle]);

  const handleNext = useCallback(() => {
    if (!hasNext || animating) return;
    animateToggle(() => setRecPageIndex(prev => prev + 1));
  }, [hasNext, animating, animateToggle]);

  // Обработка свайпов для переключения рекомендаций
  const onTouchStart = e => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const onTouchEnd = e => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].screenX;
    const distance = touchStartX.current - touchEndX;

    if (Math.abs(distance) < MIN_SWIPE_DISTANCE) return;

    if (distance > 0) {
      handleNext();
    } else {
      handlePrev();
    }

    touchStartX.current = null;
  };

  // Обработка сохранения статьи
  const handleSave = async () => {
    if (!currentUser) {
      toast.error('Please log in to save articles.');
      return;
    }
    if (isSaved) {
      toast('This article is already saved.');
      return;
    }

    try {
      await saveArticle(currentUser, articleId);
      setIsSaved(true);
      toast.success('Article saved!');
    } catch (error) {
      console.error('Failed to save article', error);
      toast.error('Failed to save article.');
    }
  };

  if (isArticleLoading) return <Loader fullScreen />;
  if (!article) return <p>Article not found</p>;

  // Форматируем дату публикации
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
    <div className={styles.articlePage}>
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
                <h3>You might also be interested in</h3>
                {isPopularLoading ? (
                  <p>Loading...</p>
                ) : currentRecommendations.length === 0 ? (
                  <p>No recommendations available</p>
                ) : (
                  <>
                    <div
                      ref={containerRef}
                      className={styles.accordionContent}
                      aria-live="polite"
                      onTouchStart={onTouchStart}
                      onTouchEnd={onTouchEnd}
                    >
                      <ul className={styles.recommendationsList}>
                        {currentRecommendations.map(
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
                    </div>

                    <div className={styles.paginationButtons}>
                      <button
                        type="button"
                        onClick={handlePrev}
                        disabled={!hasPrev || animating}
                        aria-label="Previous recommendations"
                        className={`${styles.paginationButton} ${
                          !hasPrev || animating ? styles.disabled : ''
                        }`}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15 18L9 12L15 6"
                            stroke="#070721"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!hasNext || animating}
                        aria-label="Next recommendations"
                        className={`${styles.paginationButton} ${
                          !hasNext || animating ? styles.disabled : ''
                        }`}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 18L15 12L9 6"
                            stroke="#070721"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            <ButtonToggleToBookmarks
              isOwnArticle={isOwnArticle}
              isSaved={isSaved}
              isDisabled={false}
              onToggle={handleSave}
              onDelete={null} // убрал пустую функцию
              isLoadingDelete={false}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
