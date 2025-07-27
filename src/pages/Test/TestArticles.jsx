import { useState } from 'react';
import { useGetArticles } from '../../api/hooks/articles/useGetArticles';
import { useGetArticleById } from '../../api/hooks/articles/useGetArticleById';

const TestArticles = () => {
  const [page, setPage] = useState(1);
  const {
    articles,
    pagination,
    isLoading: loadingArticles,
    refetch,
  } = useGetArticles(page);
  const [articleId, setArticleId] = useState('');
  const { article, isLoading: loadingArticle } = useGetArticleById(articleId);

  return (
    <div style={{ padding: '1rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <button onClick={refetch} disabled={loadingArticles}>
          Get All Articles
        </button>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            placeholder="Article ID"
            value={articleId}
            onChange={e => setArticleId(e.target.value)}
          />
          <button disabled={!articleId.trim()}>Get Article By ID</button>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1 || loadingArticles}
          >
            Prev
          </button>
          <span>
            Page {page} of {pagination?.totalPages || '?'}
          </span>
          <button
            onClick={() =>
              setPage(prev =>
                pagination?.totalPages
                  ? Math.min(prev + 1, pagination.totalPages)
                  : prev + 1
              )
            }
            disabled={
              (pagination && page === pagination.totalPages) || loadingArticles
            }
          >
            Next
          </button>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <details>
          <summary style={{ fontWeight: 'bold' }}>All Articles</summary>
          {loadingArticles ? (
            <p>Loading articles...</p>
          ) : (
            <ul>
              {articles.map(a => (
                <>
                  <li key={a.title}>{a.title}</li>
                  <li key={a._id}>{a._id}</li>
                </>
              ))}
            </ul>
          )}
        </details>

        <h3>Selected Article</h3>
        {loadingArticle ? (
          <p>Loading article...</p>
        ) : (
          article && (
            <details style={{ marginTop: '1rem' }}>
              <summary style={{ fontWeight: 'bold', cursor: 'pointer' }}>
                {article.title}
              </summary>
              <div style={{ marginTop: '0.5rem' }}>
                <img
                  src={article.img}
                  alt={article.title}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    marginBottom: '1rem',
                  }}
                />
                <p>
                  <strong>Description:</strong> {article.desc}
                </p>
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(article.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Rate:</strong> {article.rate}
                </p>
                <p style={{ whiteSpace: 'pre-line', marginTop: '1rem' }}>
                  {article.article}
                </p>
              </div>
            </details>
          )
        )}
      </div>
    </div>
  );
};

export default TestArticles;
