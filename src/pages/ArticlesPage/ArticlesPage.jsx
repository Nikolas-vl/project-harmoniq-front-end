import s from './ArticlesPage.module.css';
import { useSyncQueryParams } from '../../utils/useSyncQueryParams';
import ArticlesList from '../../modules/ArticlesList/ArticlesList';
import '../../assets/styles/container.css';
import SectionTitle from '../../modules/SectionTitle/SectionTitle';
import { useEffect, useState } from 'react';
import { useGetArticles } from '../../api/hooks/articles/useGetArticles';
import Pagination from '../../modules/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
const ArticlesPage = () => {
  const [filter, setFilter] = useState(null);
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(null);
  const [perPage, setPerPage] = useState(null);
  const { articles, isLoading, pagination, queryParams } = useGetArticles(
    page,
    perPage,
    filter
  );
  const handlePageChange = newPage => {
    setPage(newPage);
  };
  useEffect(() => {
    const pageFromUrl = Number(searchParams.get('page')) || 1;
    const perPageFromUrl = Number(searchParams.get('perPage')) || 12;
    setFilter('all')
    setPage(pageFromUrl);
    setPerPage(perPageFromUrl);
  }, []);
  useSyncQueryParams(queryParams);
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
          <option value="all">All</option>
          <option value="popular">Popular</option>
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
