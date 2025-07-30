import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

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
  const currentArticles = activeTab === 'my'
  ? allMyArticles
  : isOwnProfile
    ? savedArticles
    : [];

  const visibleArticles = currentArticles?.slice(0, visibleCount) || [];

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ARTICLES_PER_PAGE);
  };

  useEffect(() => {
    setVisibleCount(ARTICLES_PER_PAGE);
  }, [activeTab, authorId]);

  return (
  <div>
    <div>
      {displayAvatar ? (
        <img src={displayAvatar} alt={displayName} width={100} height={100} />
      ) : (
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            backgroundColor: '#cfcfcf',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            fontWeight: 'bold',
            color: '#fff',
          }}
        >
          {displayName?.charAt(0).toUpperCase()}
        </div>
      )}
      <h2>{displayName}</h2>
      <p>Articles: {displayArticlesAmount}</p>
    </div>

    {isOwnProfile && (
      <div>
        <button
          onClick={() => setActiveTab('my')}
          disabled={activeTab === 'my'}
        >
          My Articles
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          disabled={activeTab === 'saved'}
        >
          Saved Articles
        </button>
      </div>
    )}

    {isLoading ? (
      <p>Loading articles...</p>
    ) : (
      <>
        {currentArticles?.length === 0 ? (
          <div
            style={{
              padding: '30px 20px',
              margin: '20px auto',
              borderRadius: '16px',
              backgroundColor: '#eaf2ee',
              textAlign: 'center',
              maxWidth: 500,
            }}
          >
            <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
              Nothing found.
            </p>
            {isOwnProfile && activeTab === 'saved' ? (
              <>
                <p style={{ marginBottom: 16 }}>Save your first article</p>
                <button
                  onClick={() => navigate('/articles')}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '12px',
                    border: '1px solid #5d7e6b',
                    backgroundColor: '#eaf2ee',
                    color: '#5d7e6b',
                    cursor: 'pointer',
                  }}
                >
                  Go to articles
                </button>
              </>
            ) : (
              <>
                <p style={{ marginBottom: 16 }}>Write your first article</p>
                <button
                  onClick={() => navigate('/create')}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '12px',
                    border: '1px solid #5d7e6b',
                    backgroundColor: '#eaf2ee',
                    color: '#5d7e6b',
                    cursor: 'pointer',
                  }}
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
            />

            {visibleArticles.length < (currentArticles?.length || 0) &&
              activeTab === 'my' && (
                <button onClick={handleLoadMore}>Load More</button>
              )}

            {isOwnProfile &&
              activeTab === 'saved' &&
              savedArticles?.length > visibleArticles.length && (
                <button onClick={handleLoadMore}>Load More</button>
              )}
          </>
        )}
      </>
    )}
  </div>
);
};

export default AuthorProfilePage;
