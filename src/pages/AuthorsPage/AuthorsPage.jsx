import { useState } from 'react';
import css from './AuthorsPage.module.css';
import { AuthorsList } from '../../modules/AuthorsList/AuthorsList';
import { useGetAllUsers } from '../../api/hooks/users/useGetAllUsers';
import { useSyncQueryParams } from '../../utils/useSyncQueryParams';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../../modules/Pagination/Pagination';

const AuthorsPage = () => {
  const [searchParams] = useSearchParams();

  const initialPage = Number(searchParams.get('page')) || 1;
  const initialPerPage = Number(searchParams.get('perPage')) || 20;

  const [page, setPage] = useState(initialPage);
  const [perPage] = useState(initialPerPage);

  const { users, paginationData, isLoading, queryParams } = useGetAllUsers(
    page,
    perPage
  );

  useSyncQueryParams(queryParams);

  return (
    <section className={css.wrapper}>
      <div className="container">
        <div className={css.contentBlock}>
          <h2 className={css.title}>Authors</h2>

          <AuthorsList authors={users} loading={isLoading} />

          {users && users.length > 0 && (
            <Pagination
              page={page}
              totalPages={paginationData?.totalPages}
              onPageChange={setPage}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AuthorsPage;
