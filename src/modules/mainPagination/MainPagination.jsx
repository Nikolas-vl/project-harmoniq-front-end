import s from './mainPagination.module.css';
import IconLeft from '../../assets/icons/left.svg?react';
import IconRight from '../../assets/icons/right.svg?react';

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

export const MainPagination = ({
  page,
  totalPages,
  onPageChange,
  isLoading,
}) => {
  const visibleButtons = totalPages < 5 ? totalPages : 5;

  const pages = getPageNumbers(page, totalPages, visibleButtons);
  if (totalPages === 1) {
    return null;
  }
  return (
    <div className={s.paginationContainer}>
      <button
        className={s.navBtn}
        onClick={() => onPageChange(p => Math.max(p - 1, 1))}
        disabled={page === 1 || isLoading}
      >
        <IconLeft />
      </button>

      {pages.map(p => (
        <button
          key={p}
          className={`${s.pageBtn} ${p === page ? s.active : ''}`}
          onClick={() => onPageChange(p)}
          disabled={p === page || isLoading}
        >
          {p}
        </button>
      ))}

      <button
        className={s.navBtn}
        onClick={() => onPageChange(p => Math.min(p + 1, totalPages))}
        disabled={page === totalPages || isLoading}
      >
        <IconRight />
      </button>
    </div>
  );
};
