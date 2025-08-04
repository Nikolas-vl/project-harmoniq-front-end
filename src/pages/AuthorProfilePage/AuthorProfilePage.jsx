import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import styles from './AuthorProfilePage.module.css';

import NothingFoundCard from '../../modules/NothingFoundCard/NothingFoundCard';

import { useGetUserInfo } from '../../api/hooks/users/useGetUserInfo';
import ArticlesList from '../../modules/ArticlesList/ArticlesList';
import {
  selectSavedArticles,
  selectUserArticles,
  selectUserArticlesAmount,
  selectUserId,
} from '../../redux/auth/authSelectors';

const ARTICLES_PER_PAGE = 3;
const TABS = {
  all: 'myArticles',
  saved: 'mySavedArticles',
};
const AuthorProfilePage = () => {
  const { id: authorId } = useParams();
  const LoggedUserId = useSelector(selectUserId);
  const isOwnProfile = LoggedUserId === authorId;

  const [activeTab, setActiveTab] = useState(TABS.all);
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);
  const { user, userArticles, isLoading } = useGetUserInfo(authorId);

  const displayName = user?.name || 'Unknown Author';
  const displayAvatar = user?.avatarUrl;

  const currentUserArticles = useSelector(selectUserArticles);
  const currentUserSavedArticles = useSelector(selectSavedArticles);
  const userAmounthArticles = useSelector(selectUserArticlesAmount);
  const currentArticles =
    activeTab === TABS.all
      ? isOwnProfile
        ? currentUserArticles
        : userArticles
      : currentUserSavedArticles;

  const visibleArticles = currentArticles?.slice(0, visibleCount) || [];

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ARTICLES_PER_PAGE);
  };

  useEffect(() => {
    setVisibleCount(ARTICLES_PER_PAGE);
  }, [activeTab, authorId]);

  return (
    <div className={`container ${styles['author-profile']}`}>
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
            Articles:{' '}
            {!isOwnProfile ? user?.articlesAmount : userAmounthArticles}
          </p>
        </div>
      </div>

      {isOwnProfile && (
        <div className={styles['author-profile__tabs']}>
          <button
            className={`${styles['author-profile__tab-btn']} ${
              activeTab === TABS.all ? styles['active'] : ''
            }`}
            onClick={() => setActiveTab(TABS.all)}
            disabled={activeTab === TABS.all}
          >
            My Articles
          </button>
          <button
            className={`${styles['author-profile__tab-btn']} ${
              activeTab === TABS.saved ? styles['active'] : ''
            }`}
            onClick={() => setActiveTab(TABS.saved)}
            disabled={activeTab === TABS.saved}
          >
            Saved Articles
          </button>
        </div>
      )}

      {isLoading ? (
        <p className={styles['author-profile__loading']}>Loading articles...</p>
      ) : (
        <>
          {visibleArticles?.length === 0 ? (
            <NothingFoundCard
              title="Nothing found."
              text={
                isOwnProfile && activeTab === TABS.saved
                  ? 'Save your first article'
                  : 'Write your first article'
              }
              linkText={
                isOwnProfile && activeTab === TABS.saved
                  ? 'Go to articles'
                  : 'Create an article'
              }
              linkPath={
                isOwnProfile && activeTab === TABS.saved
                  ? '/articles'
                  : '/create'
              }
            />
          ) : (
            <>
              <ArticlesList
                articles={visibleArticles}
                isOwnProfile={isOwnProfile && activeTab === TABS.all}
              />

              {visibleArticles.length < (currentArticles?.length || 0) && (
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
