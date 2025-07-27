import { useState } from 'react';
import toast from 'react-hot-toast';
import { useGetAllUsers } from '../../api/hooks/users/useGetAllUsers';
import { useGetUserInfo } from '../../api/hooks/users/useGetUserInfo';
import { useSaveArticle } from '../../api/hooks/users/useSaveArticle';

const TestUsers = () => {
  const {
    users,
    isLoading: loadingUsers,
    paginationData,
    page,
    setPage,
  } = useGetAllUsers();

  const [userId, setUserId] = useState('');
  const [articleId, setArticleId] = useState('');
  const [targetUserId, setTargetUserId] = useState('');
  const [loadUserId, setLoadUserId] = useState('');

  const {
    user,
    userArticles,
    isLoading: loadingUserInfo,
  } = useGetUserInfo(loadUserId);

  const { saveArticle, isLoading: saving } = useSaveArticle();

  const handleSave = async () => {
    if (!userId || !articleId) return;
    try {
      await saveArticle(userId, articleId);
      toast('Article saved!');
    } catch {
      toast('Error saving article.');
    }
  };

  const handleUserLoad = () => {
    if (!targetUserId) return;
    setLoadUserId(targetUserId);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            placeholder="User ID"
            value={userId}
            onChange={e => setUserId(e.target.value)}
          />
          <input
            placeholder="Article ID"
            value={articleId}
            onChange={e => setArticleId(e.target.value)}
          />
          <button onClick={handleSave} disabled={saving}>
            Save Article
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            placeholder="User ID"
            value={targetUserId}
            onChange={e => setTargetUserId(e.target.value)}
          />
          <button onClick={handleUserLoad} disabled={!targetUserId}>
            Get User By ID
          </button>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <details>
          <summary style={{ fontWeight: 'bold' }}>
            All Users (page {paginationData?.page || 1} of{' '}
            {paginationData?.totalPages || 1})
          </summary>

          {loadingUsers ? (
            <p>Loading users...</p>
          ) : (
            <>
              <ul>
                {users.map(u => (
                  <li key={u._id}>
                    {u.name} ({u._id})
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: '1rem' }}>
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={!paginationData?.hasPreviousPage}
                >
                  Prev
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={!paginationData?.hasNextPage}
                  style={{ marginLeft: '0.5rem' }}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </details>

        <h3>User Info</h3>
        {loadingUserInfo ? (
          <p>Loading user info...</p>
        ) : (
          user && (
            <div>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Saved:</strong> {user.saved.join(', ')}
              </p>
              <h4>Articles:</h4>
              <ul>
                {userArticles.map(a => (
                  <li key={a._id}>{a.title}</li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TestUsers;
