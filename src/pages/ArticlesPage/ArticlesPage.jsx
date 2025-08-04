import s from './ArticlesPage.module.css';
import { useSyncQueryParams } from '../../utils/useSyncQueryParams';
import ArticlesList from '../../modules/ArticlesList/ArticlesList';
import '../../assets/styles/container.css';
import SectionTitle from '../../modules/SectionTitle/SectionTitle';
import { useGetArticles } from '../../api/hooks/articles/useGetArticles';
import { useSearchParams } from 'react-router-dom';
import NothingFoundCard from '../../modules/NothingFoundCard/NothingFoundCard';
import { useState } from 'react';
import { MainPagination } from '../../modules/mainPagination/mainPagination';

const ArticlesPage = () => {
  const [searchParams] = useSearchParams();

  const initialPage = Number(searchParams.get('page')) || 1;
  const initialPerPage = Number(searchParams.get('perPage')) || 12;

  const [page, setPage] = useState(initialPage);
  const [perPage] = useState(initialPerPage);
  const [filter, setFilter] = useState(null);

  const { articles, isLoading, pagination, queryParams } = useGetArticles(
    page,
    perPage,
    filter
  );

  useSyncQueryParams(queryParams);

  if (isLoading) return <p>Loading...</p>;

  const isNothingFound = !pagination || articles.length === 0;

  return (
    <section className={`container ${s.section}`}>
      <SectionTitle>Articles</SectionTitle>

      <div className={s.header}>
        <p className={s.totalArticles}>
          {pagination?.totalItems || 0} articles
        </p>

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

      {isNothingFound ? (
        <>
          <NothingFoundCard
            title="Nothing found."
            text="Be the first, who creates an article"
            linkText="Create an article"
            linkPath="/create"
          />
        </>
      ) : (
        <>
          <ArticlesList
            articles={articles}
            isLoading={isLoading}
            pagination={pagination}
          />
          {articles && articles.length > 0 && (
            <MainPagination
              page={page}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
              isLoading={isLoading}
            />
          )}
        </>
      )}
    </section>
  );
};

export default ArticlesPage;
