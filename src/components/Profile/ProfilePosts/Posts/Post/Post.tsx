import { useAppSelector } from '../../../../../hooks/hooks';
import profileAvatar from '../../../../../images/profile__avatar.png';
import { getDescription } from '../../../../../redux/selectors/profile-selector';
import s from './../../../Profile.module.scss';
import cn from 'classnames';

interface PostPropsType {
  text: string;
}

export const Post = ({ text }: PostPropsType) => {
  const profileDescription = useAppSelector(getDescription);

  let postsProfileBottom = cn(
    s['posts-profile__bottom'],
    s['posts-profile-bottom'],
  );

  return (
    <div className={postsProfileBottom}>
      <div className={s['posts-profile-bottom__avatar']}>
        {profileDescription?.photos?.small ? (
          <img src={profileDescription?.photos?.small} alt="" />
        ) : (
          <img src={profileAvatar} alt="" />
        )}
      </div>
      <div className={s['posts-profile-bottom__text']}>{text}</div>
    </div>
  );
};
