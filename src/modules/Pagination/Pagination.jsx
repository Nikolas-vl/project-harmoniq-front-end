import s from './Pagination.module.css';
import ReactPaginate from 'react-paginate';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={event => {
        event.preventDefault?.();
        onPageChange(event.selected + 1);
      }}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      forcePage={currentPage - 1}
      containerClassName={s.pagination}
      pageClassName={s.page_item}
      pageLinkClassName={s.page_link}
      previousClassName={s.page_item}
      previousLinkClassName={s.page_link}
      nextClassName={s.page_item}
      nextLinkClassName={s.page_link}
      breakClassName={s.page_item}
      breakLinkClassName={s.page_link}
      activeClassName={s.active}
      disabledClassName={s.disabled}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
