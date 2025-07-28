import { useState } from 'react';
import toast from 'react-hot-toast';
import { useGetAllUsers } from '../../api/hooks/users/useGetAllUsers';
import { useGetUserInfo } from '../../api/hooks/users/useGetUserInfo';
import { useSaveArticle } from '../../api/hooks/users/useSaveArticle';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../redux/auth/authSelectors';
import TestNav from './TestNav';

const TestUsers = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const loggedUserId = useSelector(selectUserId);
  const {
    users,
    isLoading: loadingUsers,
    paginationData,
  } = useGetAllUsers(page, perPage);

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
      toast.success('Article saved!');
    } catch {
      toast.error('Error saving article.');
    }
  };

  const handleUserLoad = () => {
    if (!targetUserId) return;
    setLoadUserId(targetUserId);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <TestNav />

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
      <p>Ur user id is {loggedUserId ? loggedUserId : 'ur not loggin'}</p>
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

              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={!paginationData?.hasPreviousPage}
                >
                  Prev
                </button>

                <label>
                  Users per page:{' '}
                  <select
                    value={perPage}
                    onChange={e => setPerPage(Number(e.target.value))}
                  >
                    {[6, 12, 24, 48].map(n => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  onClick={() =>
                    setPage(prev =>
                      Math.min(prev + 1, paginationData?.totalPages || prev + 1)
                    )
                  }
                  disabled={!paginationData?.hasNextPage}
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
                <strong>Saved:</strong>{' '}
                {Array.isArray(user.saved) ? user.saved.join(', ') : ''}
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
