import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import styles from './AuthorProfilePage.module.css'

import {
  selectUserId,
  selectUserName,
  selectUserAvatarUrl,
  selectUserArticlesAmount,
  selectUserArticles,
  selectSavedArticles,
} from '../../redux/auth/authSelectors';

import { useGetUserInfo } from '../../api/hooks/users/useGetUserInfo';
import ArticlesList from '../../modules/ArticlesList/ArticlesList';

const ARTICLES_PER_PAGE = 12;

const AuthorProfilePage = () => {
  const { id: authorId } = useParams();
  const loggedUserId = useSelector(selectUserId);
  const isOwnProfile = loggedUserId === authorId;

  const navigate = useNavigate();

  const name = useSelector(selectUserName);
  const avatarUrl = useSelector(selectUserAvatarUrl);
  const articlesAmount = useSelector(selectUserArticlesAmount);
  const myArticles = useSelector(selectUserArticles);
  const savedArticles = useSelector(selectSavedArticles);

  const { user, userArticles, isLoading } = useGetUserInfo(
    !isOwnProfile ? authorId : null
  );

  const displayName = isOwnProfile ? name : user?.name;
  const displayAvatar = isOwnProfile ? avatarUrl : user?.avatarUrl;
  const displayArticlesAmount = isOwnProfile
    ? articlesAmount
    : user?.articlesAmount;

  const [activeTab, setActiveTab] = useState('my');
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);

  const allMyArticles = isOwnProfile ? myArticles : userArticles;
  const currentArticles =
    activeTab === 'my' ? allMyArticles : isOwnProfile ? savedArticles : [];

  const visibleArticles = currentArticles?.slice(0, visibleCount) || [];

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ARTICLES_PER_PAGE);
  };

  useEffect(() => {
    setVisibleCount(ARTICLES_PER_PAGE);
  }, [activeTab, authorId]);

  return (
    <div className={styles['author-profile']}>
      {isOwnProfile && <h1 className={styles['header']}>My profile</h1>}
      <div className={styles['author-profile__header']}>
        {displayAvatar ? (
          <img
            className={styles['author-profile__avatar']}
            src={displayAvatar}
            alt={displayName}
            width={100}
            height={100}
          />
        ) : (
          <div className={styles['author-profile__avatar-placeholder']}>
            {displayName?.charAt(0).toUpperCase()}
          </div>
        )}
        <div className={styles['author-profile__name__articles-amount']}>
          <h2 className={styles['author-profile__name']}>{displayName}</h2>
          <p className={styles['author-profile__articles-amount']}>
            Articles: {displayArticlesAmount}
          </p>
        </div>
      </div>

      {isOwnProfile && (
        <div className={styles['author-profile__tabs']}>
          <button
            className={`${styles['author-profile__tab-btn']} ${
              activeTab === 'my' ? styles['active'] : ''
            }`}
            onClick={() => setActiveTab('my')}
            disabled={activeTab === 'my'}
          >
            My Articles
          </button>
          <button
            className={`${styles['author-profile__tab-btn']} ${
              activeTab === 'saved' ? styles['active'] : ''
            }`}
            onClick={() => setActiveTab('saved')}
            disabled={activeTab === 'saved'}
          >
            Saved Articles
          </button>
        </div>
      )}

      {isLoading ? (
        <p className={styles['author-profile__loading']}>Loading articles...</p>
      ) : (
        <>
          {currentArticles?.length === 0 ? (
            <div className={styles['author-profile__empty']}>
              <svg
                width="64"
                height="64"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles['author-profile__empty-icon']}
              >
                <path
                  d="M20 28.4444V30.5556M20 9.44444V22.1111M39 20C39 30.4934 30.4934 39 20 39C9.50659 39 1 30.4934 1 20C1 9.50659 9.50659 1 20 1C30.4934 1 39 9.50659 39 20Z"
                  stroke="#070721"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              <p className={styles['author-profile__empty-title']}>
                Nothing found.
              </p>

              {isOwnProfile && activeTab === 'saved' ? (
                <>
                  <p className={styles['author-profile__empty-subtitle']}>
                    Save your first article
                  </p>
                  <button
                    className={styles['author-profile__action-btn']}
                    onClick={() => navigate('/articles')}
                  >
                    Go to articles
                  </button>
                </>
              ) : (
                <>
                  <p className={styles['author-profile__empty-subtitle']}>
                    Write your first article
                  </p>
                  <button
                    className={styles['author-profile__action-btn']}
                    onClick={() => navigate('/create')}
                  >
                    Create an article
                  </button>
                </>
              )}
            </div>
          ) : (
            <>
              <ArticlesList
                articles={
                  isOwnProfile && activeTab === 'saved'
                    ? savedArticles?.slice(0, visibleCount)
                    : visibleArticles
                }
                isOwnProfile={isOwnProfile && activeTab === 'my'}
                activeTab={activeTab}
              />

              {visibleArticles.length < (currentArticles?.length || 0) &&
                activeTab === 'my' && (
                  <button
                    className={styles['author-profile__load-more-btn']}
                    onClick={handleLoadMore}
                  >
                    Load More
                  </button>
                )}

              {isOwnProfile &&
                activeTab === 'saved' &&
                savedArticles?.length > visibleArticles.length && (
                  <button
                    className={styles['author-profile__load-more-btn']}
                    onClick={handleLoadMore}
                  >
                    Load More
                  </button>
                )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AuthorProfilePage;
