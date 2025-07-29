import s from './ArticlesPage.module.css';
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
      <div className={s.header}>
        <p className={s.totalArticles}>{pagination.totalItems} articles</p>
        <select
          value={filter}
          name="select"
          onChange={e => setFilter(e.target.value)}
          className={s.select}
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
