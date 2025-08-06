import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './AuthorProfilePage.module.css';
import NothingFoundCard from '../../modules/NothingFoundCard/NothingFoundCard';
import { useGetUserInfo } from '../../api/hooks/users/useGetUserInfo';
import ArticlesList from '../../modules/ArticlesList/ArticlesList';
import { ProfileTabs } from '../../modules/ProfileTabs/ProfileTabs';
import { ARTICLES_PER_PAGE, TABS } from '../../constants/profilePage';
import editor from '../../assets/icons/uploadPhoto/editor.svg';
import {
  selectSavedArticles,
  selectUserArticles,
  selectUserArticlesAmount,
  selectUserAvatarUrl,
  selectUserId,
  selectUserName,
} from '../../redux/user/userSelectors';
import { fetchUserProfile } from '../../redux/user/userOperations';

const AuthorProfilePage = () => {
  const { id: authorId } = useParams();
  const dispatch = useDispatch();

  const currentUserId = useSelector(selectUserId);

  const isOwnProfile = currentUserId === authorId;
  useEffect(() => {
    const fetchProfile = async () => {
      if (isOwnProfile) {
        await dispatch(fetchUserProfile());
      }
    };

    fetchProfile();
  }, [dispatch, isOwnProfile]);

  const currentUserName = useSelector(selectUserName);
  const currentUserAvatar = useSelector(selectUserAvatarUrl);
  const currentUserArticles = useSelector(selectUserArticles);
  const currentUserSavedArticles = useSelector(selectSavedArticles);
  const userAmounthArticles = useSelector(selectUserArticlesAmount);

  const [activeTab, setActiveTab] = useState(TABS.all);
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);
  const { user, userArticles } = useGetUserInfo(
    !isOwnProfile ? authorId : null
  );

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
    <section className={`container ${styles['author-profile']}`}>
      {isOwnProfile && <h1 className={styles['header']}>My profile</h1>}
      {isOwnProfile ? (
        <Link
          to="/update-profile"
          className={styles['author-profile__header-link']}
        >
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
                <h2 className={styles['author-profile__name']}>
                  {displayName}
                </h2>
              </div>
              <p className={styles['author-profile__articles-amount']}>
                Articles: {displayArticlesAmount}
              </p>
            </div>

            <div className={styles['edit-profile-link']}>
              <img
                src={editor}
                alt="Edit profile"
                className={styles.editIcon}
              />
            </div>
          </div>
        </Link>
      ) : (
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
            </div>
            <p className={styles['author-profile__articles-amount']}>
              Articles: {displayArticlesAmount}
            </p>
          </div>
        </div>
      )}

      {isOwnProfile && (
        <ProfileTabs setActiveTab={handleChangeTabs} activeTab={activeTab} />
      )}

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
            isOwnProfile && activeTab === TABS.saved ? '/articles' : '/create'
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
    </section>
  );
};

export default AuthorProfilePage;
