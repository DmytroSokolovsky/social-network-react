import { useEffect } from 'react';
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

const Users = () => {
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

  return (
    <>
      <div className={s.users}>
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
