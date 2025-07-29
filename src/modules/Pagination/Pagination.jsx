import s from './pagination.module.css';
import left from '../../assets/icons/left.svg';
import right from '../../assets/icons/right.svg';


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

const Pagination = ({
    page,
    totalPages,
    onPageChange,
    isLoading,
    maxButtons = 5
}) => {
    const pages = getPageNumbers(page, totalPages, maxButtons);

    return (
        <div className={s.paginationContainer}>
            <button
                className={s.navBtn}
                onClick={() => onPageChange(p => Math.max(p - 1, 1))}
                disabled={page === 1 || isLoading}
            >
                <img src={left} alt='prev page' width={16} height={16} />
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
                <img src={right} alt='next page' width={16} height={16} />
            </button>
        </div>
    );
};

export default Pagination;
