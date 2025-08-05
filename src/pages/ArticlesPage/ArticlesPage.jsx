import s from './ArticlesPage.module.css';
import { useSyncQueryParams } from '../../utils/useSyncQueryParams';
import ArticlesList from '../../modules/ArticlesList/ArticlesList';
import '../../assets/styles/container.css';
import SectionTitle from '../../modules/SectionTitle/SectionTitle';
import { useGetArticles } from '../../api/hooks/articles/useGetArticles';
import { useSearchParams } from 'react-router-dom';
import NothingFoundCard from '../../modules/NothingFoundCard/NothingFoundCard';
import { useEffect, useRef, useState } from 'react';
import { Pagination } from '../../modules/Pagination/Pagination';

const ArticlesPage = () => {
  const [searchParams] = useSearchParams();

  const initialPage = Number(searchParams.get('page')) || 1;
  const initialPerPage = Number(searchParams.get('perPage')) || 12;

  const [page, setPage] = useState(initialPage);
  const [perPage] = useState(initialPerPage);
  const [filter, setFilter] = useState(null);

  const { articles, isLoading, pagination, queryParams } = useGetArticles({
    page,
    perPage,
    filter,
  });

  useSyncQueryParams(queryParams);

  const isNothingFound = !pagination || articles.length === 0;

  // Dropdown logic
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const selectOption = value => {
    setFilter(value);
    setIsOpen(false);
  };

  const currentLabel = filter === 'popular' ? 'Popular' : 'All';

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className={`container ${s.section}`}>
      <SectionTitle>Articles</SectionTitle>

      <div className={s.header}>
        <p className={s.totalArticles}>
          {pagination?.totalItems || 0} articles
        </p>

        <div className={s.dropdown} ref={dropdownRef}>
          <button onClick={toggleDropdown} className={s.dropdownButton}>
            {currentLabel}{' '}
            <span className={`${s.arrow} ${isOpen ? s.open : ''}`}>{'>'}</span>
          </button>

          {isOpen && (
            <ul className={s.dropdownList}>
              <li
                onClick={() => filter !== 'all' && selectOption('all')}
                className={filter === 'all' || filter === null ? s.isActive : ''}
              >
                All
              </li>
              <li
                onClick={() => filter !== 'popular' && selectOption('popular')}
                className={filter === 'popular' ? s.isActive : ''}
              >
                Popular
              </li>
            </ul>
          )}
        </div>
      </div>

      {isNothingFound ? (
        <NothingFoundCard
          title="Nothing found."
          text="Be the first, who creates an article"
          linkText="Create an article"
          linkPath="/create"
        />
      ) : (
        <>
          <ArticlesList
            articles={articles}
            isLoading={isLoading}
            pagination={pagination}
          />
          {articles && articles.length > 0 && (
            <Pagination
              page={page}
              totalPages={pagination?.totalPages}
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
