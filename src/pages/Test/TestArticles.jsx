import { useState } from 'react';
import { useGetArticles } from '../../api/hooks/articles/useGetArticles';
import { useGetArticleById } from '../../api/hooks/articles/useGetArticleById';
import TestNav from './TestNav';

function getPageNumbers(currentPage, totalPages, maxButtons = 5) {
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, currentPage - half);
  let end = start + maxButtons - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxButtons + 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
}

const TestArticles = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  const { articles, pagination, isLoading } = useGetArticles(page, perPage);
  const [articleId, setArticleId] = useState('');
  const { article, isLoading: loadingArticle } = useGetArticleById(articleId);

  const totalPages = pagination?.totalPages || 1;
  const pages = getPageNumbers(page, totalPages, 5);

  return (
    <div style={{ padding: '1rem' }}>
      <TestNav />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            placeholder="Article ID"
            value={articleId}
            onChange={e => setArticleId(e.target.value)}
          />
          <button disabled={!articleId.trim()}>Get Article By ID</button>
        </div>

        {/* Пагінація */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1 || isLoading}
          >
            Prev
          </button>

          {pages.map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              disabled={p === page || isLoading}
              style={{
                fontWeight: p === page ? 'bold' : 'normal',
                padding: '6px 10px',
              }}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages || isLoading}
          >
            Next
          </button>

          <label style={{ marginLeft: '1rem' }}>
            Per page:{' '}
            <select
              value={perPage}
              onChange={e => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              disabled={isLoading}
            >
              {[6, 12, 24, 48].map(n => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div>
        {isLoading ? (
          <p>Loading articles...</p>
        ) : (
          <details>
            <summary style={{ fontWeight: 'bold' }}>All Articles</summary>
            <ul>
              {articles.map(a => (
                <li key={a._id || a.title}>
                  <p> {a.title}</p>
                  <p>{a._id}</p>
                </li>
              ))}
            </ul>
          </details>
        )}

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
