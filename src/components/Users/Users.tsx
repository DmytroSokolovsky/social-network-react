import { useContext, useEffect } from 'react';
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
import { Toast } from '../Toast/Toast';
import { UsersPaginator } from './UsersPaginator/UsersPaginator';
import { User } from './User/User';
import { ThemeContext } from '../../context/context';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

interface FilterFormData {
  term: string;
  friend: string;
  pageCount: string;
}

const Users = () => {
  const { register, handleSubmit, reset } = useForm<FilterFormData>({
    defaultValues: {
      friend: 'null',
      pageCount: '20',
    },
  });

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

  let pagesCount;
  let pages = [];

  if (totalCount !== null) {
    pagesCount = Math.ceil(totalCount / count);

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
  }

  const countQuery = searchParams.get('count') || '';
  const pageQuery = searchParams.get('page') || '';
  const termQuery = searchParams.get('term') || '';
  const friendQuery = searchParams.get('friend') || '';

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

    reset({
      term: termQuery,
      friend: friendQuery,
      pageCount: countQuery,
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
    reset,
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

  const onSubmit = handleSubmit(data => {
    dispatch(setFriendFilter(data.friend));
    dispatch(setTermFilter(data.term));
    dispatch(setPage(1));
    dispatch(setCount(+data.pageCount));

    JSON.stringify(data);

    setSearchParams({
      count: data.pageCount,
      page: '1',
      term: data.term,
      friend: data.friend,
    });

    dispatch(
      getUsers({
        count: data.pageCount,
        page: '1',
        term: data.term,
        friend: data.friend,
      }),
    );
  });

  return (
    <>
      <div className={usersClass}>
        <form onSubmit={onSubmit}>
          Filter: <input type="text" {...register('term')} />
          Choose:
          <select {...register('friend')}>
            <option value="null">All</option>
            <option value="true">Followed</option>
            <option value="false">Unfollowed</option>
          </select>
          Users count on page:
          <select {...register('pageCount')}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="90">90</option>
          </select>
          <button type="submit">Search</button>
        </form>
        <UsersPaginator
          pages={pages}
          handleSetPage={handleSetPage}
          currentPage={+pageQuery}
        />
        <div className={s.users__bottom}>
          {users?.map(user => {
            const followingId = following.find(id => id === user.id);
            return <User user={user} key={user.id} followingId={followingId} />;
          })}
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

export default Users;
