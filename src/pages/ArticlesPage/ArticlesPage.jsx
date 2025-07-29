import ArticlesList from '../../modules/ArticlesList/ArticlesList';
import '../../assets/styles/container.css';
import SectionTitle from '../../modules/SectionTitle/SectionTitle';
import { useState } from 'react';
import { useGetArticles } from '../../api/hooks/articles/useGetArticles';
import Pagination from '../../modules/Pagination/Pagination';
const ArticlesPage = () => {
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(1);
  const perPage = 12;
  const { articles, isLoading, pagination } = useGetArticles(page, perPage);
  const handlePageChange = newPage => {
    setPage(newPage);
  };
  if (isLoading) return <p>Loading...</p>;
  if (!pagination) return <p>No data</p>;
  return (
    <div className="container">
      <SectionTitle>Articles</SectionTitle>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          marginTop: '20px',
          width: '100%',
        }}
      >
        <p
          style={{
            fontWeight: 700,
            fontSize: '18px',
            color: 'var(--color--black)',
          }}
        >
          {pagination.totalItems} articles
        </p>
        <select
          value={filter}
          name="select"
          onChange={e => setFilter(e.target.value)}
          style={{
            width: '169px',
            height: '33px',
            padding: '4px 8px',
            fontSize: '16px',
            border: '1px solid #9F9F9F',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          <option value="All">All</option>
          <option value="Popular">Popular</option>
        </select>
      </div>
      <ArticlesList
        articles={articles}
        isLoading={isLoading}
        pagination={pagination}
      />
      <Pagination
        currentPage={page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ArticlesPage;
