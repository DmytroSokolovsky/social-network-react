import { useNavigate } from 'react-router-dom';
import { UserType } from '../../../api/users-api';
import profileAvatar from '../../../images/profile__avatar.png';
import s from './../Users.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { follow, unFollow } from '../../../redux/users-reducer';
import {
  getFollowStatus,
  getFollowing,
  getUnFollowStatus,
} from '../../../redux/selectors/users-selector';
import cn from 'classnames';

interface UserProps {
  user: UserType;
  followingId: number | undefined;
}

export const User = ({ user, followingId }: UserProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const followStatus = useAppSelector(getFollowStatus);
  const unFollowStatus = useAppSelector(getUnFollowStatus);
  const following = useAppSelector(getFollowing);

  const handleClick = (userId: number) => {
    navigate(`/profile/${userId}`, { replace: true });
  };

  const handleFollow = (userId: number) => {
    dispatch(follow(userId));
  };

  const handleUnfollow = (userId: number) => {
    dispatch(unFollow(userId));
  };

  let followClass = cn(s.user__follow, {
    [s.loading]: unFollowStatus === 'loading',
  });

  let unFollowClass = cn(s.user__unFollow, {
    [s.loading]: followStatus === 'loading',
  });

  return (
    <div className={s.user}>
      <div className={s.user__image} onClick={() => handleClick(user.id)}>
        {user?.photos?.small ? (
          <img src={user?.photos?.small} alt="" />
        ) : (
          <img src={profileAvatar} alt="" />
        )}
      </div>
      <div className={s.user__info}>
        <div className={s.user__name}>{user.name}</div>
        {user.followed && (
          <button
            className={
              !followingId
                ? s.user__unFollow
                : `${s.user__unFollow} ${s.loading}`
            }
            disabled={Boolean(followingId)}
            onClick={() => handleUnfollow(user.id)}
          >
            <span>Unfollow</span>
          </button>
        )}
        {!user.followed && (
          <button
            className={
              !followingId ? s.user__follow : `${s.user__follow} ${s.loading}`
            }
            disabled={Boolean(followingId)}
            onClick={() => handleFollow(user.id)}
          >
            <span>Follow</span>
          </button>
        )}
      </div>
    </div>
  );
};
