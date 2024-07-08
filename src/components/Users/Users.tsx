import { useContext, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  getUsers,
  setCount,
  setFriendFilter,
  setPage,
  setTermFilter,
} from '../../redux/users-reducer';
import {
  getCount,
  getFollowErrorMessage,
  getFollowStatus,
  getFollowing,
  getFriendFilter,
  getPage,
  getTermFilter,
  getTotalCount,
  getUnFollowErrorMessage,
  getUnFollowStatus,
  getUsersErrorMessage,
  getUsersSelector,
  getUsersStatus,
} from '../../redux/selectors/users-selector';
import s from './Users.module.scss';
import { Toast } from '../common/Toast/Toast';
import { UsersPaginator } from './UsersPaginator/UsersPaginator';
import { User } from './User/User';
import { ThemeContext } from '../../context/context';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { UsersFilter } from './UsersFilter/UsersFilter';
import preloader from './../../images/preloader.gif';

const Users = () => {
  const theme = useContext(ThemeContext);

  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsersSelector);
  const totalCount = useAppSelector(getTotalCount);
  const count = useAppSelector(getCount);
  const currentPage = useAppSelector(getPage);

  const usersStatus = useAppSelector(getUsersStatus);
  const usersErrorMessage = useAppSelector(getUsersErrorMessage);

  const followStatus = useAppSelector(getFollowStatus);
  const followErrorMessage = useAppSelector(getFollowErrorMessage);

  const unFollowStatus = useAppSelector(getUnFollowStatus);
  const unFollowErrorMessage = useAppSelector(getUnFollowErrorMessage);

  const friendFilter = useAppSelector(getFriendFilter);
  const termFilter = useAppSelector(getTermFilter);

  const [searchParams, setSearchParams] = useSearchParams({
    count: count.toString(),
    page: currentPage.toString(),
    term: termFilter,
    friend: friendFilter,
  });

  const pages = useMemo(() => {
    return calculatePages(totalCount, count);
  }, [totalCount, count]);

  const countQuery = searchParams.get('count') || '10';
  const pageQuery = searchParams.get('page') || '1';
  const termQuery = searchParams.get('term') || '';
  const friendQuery = searchParams.get('friend') || 'null';

  useEffect(() => {
    dispatch(setFriendFilter(friendQuery));
    dispatch(setTermFilter(termQuery));
    dispatch(setPage(+pageQuery));
    dispatch(setCount(+countQuery));

    setSearchParams({
      count: countQuery,
      page: pageQuery,
      term: termQuery,
      friend: friendQuery,
    });

    dispatch(
      getUsers({
        count: countQuery,
        page: pageQuery,
        term: termQuery,
        friend: friendQuery,
      }),
    );
  }, [
    countQuery,
    dispatch,
    friendQuery,
    pageQuery,
    setSearchParams,
    termQuery,
  ]);

  const handleSetPage = (page: number) => {
    dispatch(setPage(page));

    setSearchParams({
      count: count.toString(),
      page: page.toString(),
      term: termQuery,
      friend: friendQuery,
    });

    dispatch(
      getUsers({
        count: count.toString(),
        page: page.toString(),
        term: termQuery,
        friend: friendQuery,
      }),
    );
  };

  const following = useAppSelector(getFollowing);

  let usersClass = cn(s.users, {
    [s.light]: theme === 'light',
    [s.dark]: theme === 'dark',
  });

  return (
    <>
      <div className={usersClass}>
        <UsersFilter />
        {users !== null && users.length > 0 ? (
          <UsersPaginator
            pages={pages}
            handleSetPage={handleSetPage}
            currentPage={+pageQuery}
          />
        ) : (
          ''
        )}
        <div className={s.users__bottom}>
          {usersStatus === 'loading' && (
            <div className={s.users__loading}>
              <img src={preloader} alt="Loading..." />
            </div>
          )}
          {users !== null && users.length > 0 && usersStatus === 'resolved'
            ? users.map(user => {
                const followingId = following.find(id => id === user.id);
                return (
                  <User user={user} key={user.id} followingId={followingId} />
                );
              })
            : usersStatus !== 'loading' && (
                <div className={s.users__no}>No users found</div>
              )}
        </div>
      </div>
      {usersStatus === 'rejected' && <Toast errorMessage={usersErrorMessage} />}
      {followStatus === 'rejected' && (
        <Toast errorMessage={followErrorMessage} />
      )}
      {unFollowStatus === 'rejected' && (
        <Toast errorMessage={unFollowErrorMessage} />
      )}
    </>
  );
};

const calculatePages = (totalCount: number | null, count: number) => {
  if (totalCount === null) return [];

  let pagesCount = Math.ceil(totalCount / count);
  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return pages;
};

export default Users;
