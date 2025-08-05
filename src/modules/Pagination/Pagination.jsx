import { useState, useEffect } from 'react';
import s from './Pagination.module.css';
import IconLeft from '../../assets/icons/left.svg?react';
import IconRight from '../../assets/icons/right.svg?react';
import { useDebouncedValue } from './hooks/useDebouncedValue';

function getPageNumbers(currentPage, totalPages, maxButtons) {
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

export const Pagination = ({ page, totalPages, onPageChange, isLoading }) => {
  const [nextPage, setNextPage] = useState(page);

  useEffect(() => {
    setNextPage(page);
  }, [page]);

  const debouncedPage = useDebouncedValue(nextPage, 1000);

  useEffect(() => {
    if (debouncedPage !== page) {
      onPageChange(debouncedPage);
    }
  }, [debouncedPage, page, onPageChange]);

  if (totalPages <= 1) return null;

  const visibleButtons = totalPages < 5 ? totalPages : 5;
  const pages = getPageNumbers(nextPage, totalPages, visibleButtons);

  return (
    <div className={s.paginationContainer}>
      <button
        className={s.navBtn}
        onClick={() => setNextPage(p => Math.max(p - 1, 1))}
        disabled={nextPage === 1 || isLoading}
      >
        {isLoading ? <span className="loading"></span> : <IconLeft />}
      </button>

      {pages.map(p => (
        <button
          key={p}
          className={`${s.pageBtn} ${p === nextPage ? s.active : ''}`}
          onClick={() => setNextPage(p)}
          disabled={p === nextPage || isLoading}
        >
          {p}
        </button>
      ))}

      <button
        className={s.navBtn}
        onClick={() => setNextPage(p => Math.min(p + 1, totalPages))}
        disabled={nextPage === totalPages || isLoading}
      >
        {isLoading ? <span className="loading"></span> : <IconRight />}
      </button>
    </div>
  );
};
