import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getUsers } from '../../redux/users-reducer';
import { getUsersSelector } from '../../redux/selectors/users-selector';
import profileAvatar from '../../images/profile__avatar.png';
import { Link } from 'react-router-dom';

const Users = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsersSelector);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
      {users?.map(user => {
        return (
          <Link to={`profile/${user.id}`}>
            {user?.photos?.small ? (
              <img src={user?.photos?.small} alt="" />
            ) : (
              <img src={profileAvatar} alt="" />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default Users;
