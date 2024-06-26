import cn from 'classnames';
import s from '../Users.module.scss';

interface UsersPaginatorPropsType {
  pages: Array<number>;
  handleSetPage: (page: number) => void;
  currentPage: number;
}

export const UsersPaginator = ({
  pages,
  handleSetPage,
  currentPage,
}: UsersPaginatorPropsType) => {
  return (
    <div className={s.paginator}>
      {pages.map(page => {
        const isActive = currentPage === page;
        let pageClass = cn(s.paginator__page, {
          [s.active]: isActive,
        });
        return (
          <div
            className={pageClass}
            onClick={() => handleSetPage(page)}
            key={page}
          >
            <span>{page}</span>
          </div>
        );
      })}
    </div>
  );
};
