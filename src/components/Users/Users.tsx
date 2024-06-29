import { useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getUsers, setPage } from '../../redux/users-reducer';
import {
  getCount,
  getFollowErrorMessage,
  getFollowStatus,
  getFollowing,
  getPage,
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

interface FilterFormData {
  term: string;
  friend: 'all' | 'true' | 'false';
}

const Users = () => {
  const { register, handleSubmit, reset } = useForm<FilterFormData>({
    defaultValues: {
      friend: 'all',
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

  let pagesCount;
  let pages = [];

  if (totalCount !== null) {
    pagesCount = Math.ceil(totalCount / count);

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
  }

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, count, currentPage]);

  const handleSetPage = (page: number) => {
    dispatch(setPage(page));
  };

  const following = useAppSelector(getFollowing);

  let usersClass = cn(s.users, {
    [s.light]: theme === 'light',
    [s.dark]: theme === 'dark',
  });

  const onSubmit = handleSubmit(data => {
    JSON.stringify(data);
    console.log(data);
  });

  return (
    <>
      <div className={usersClass}>
        <form onSubmit={onSubmit}>
          <input type="text" {...register('term')} />
          <select {...register('friend')}>
            <option value="all">All</option>
            <option value="true">Followed</option>
            <option value="false">Unfollowed</option>
          </select>
          <button type="submit">Search</button>
        </form>
        <UsersPaginator
          pages={pages}
          handleSetPage={handleSetPage}
          currentPage={currentPage}
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
