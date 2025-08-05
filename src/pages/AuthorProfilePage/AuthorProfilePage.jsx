import { Link, useParams } from 'react-router-dom';
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
  selectUserAvatarUrl,
  selectUserId,
  selectUserName,
} from '../../redux/auth/authSelectors';
import { ProfileTabs } from '../../modules/ProfileTabs/ProfileTabs';
import { ARTICLES_PER_PAGE, TABS } from '../../constants/profilePage';
import editor from '../../assets/icons/uploadPhoto/editor.svg';

const AuthorProfilePage = () => {
  const { id: authorId } = useParams();
  const currentUserId = useSelector(selectUserId);
  const currentUserName = useSelector(selectUserName);
  const currentUserAvatar = useSelector(selectUserAvatarUrl);
  const currentUserArticles = useSelector(selectUserArticles);
  const currentUserSavedArticles = useSelector(selectSavedArticles);
  const userAmounthArticles = useSelector(selectUserArticlesAmount);

  const isOwnProfile = currentUserId === authorId;

  const [activeTab, setActiveTab] = useState(TABS.all);
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);
  const { user, userArticles, isLoading } = useGetUserInfo(authorId);

  const displayName = isOwnProfile
    ? currentUserName
    : user?.name || 'Unknown Author';

  const displayAvatar = isOwnProfile ? currentUserAvatar : user?.avatarUrl;

  const displayArticlesAmount = !isOwnProfile
    ? user?.articlesAmount
    : userAmounthArticles;

  const currentArticles =
    activeTab === TABS.all
      ? isOwnProfile
        ? currentUserArticles
        : userArticles
      : currentUserSavedArticles;

  const visibleArticles = currentArticles?.slice(0, visibleCount) || [];

  const handleChangeTabs = tab => {
    setActiveTab(tab);
  };
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
          <div className={styles['author-profile__name-wrapper']}>
            <h2 className={styles['author-profile__name']}>{displayName}</h2>
            {isOwnProfile && (
              <Link
                to="/update-profile"
                className={styles['edit-profile-link']}
              >
                <img
                  src={editor}
                  alt="Change photo"
                  className={styles.editIcon}
                />
              </Link>
            )}
          </div>
          <p className={styles['author-profile__articles-amount']}>
            Articles: {displayArticlesAmount}
          </p>
        </div>
      </div>

      {isOwnProfile && (
        <ProfileTabs setActiveTab={handleChangeTabs} activeTab={activeTab} />
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
