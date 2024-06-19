import profileAvatar from '../../../../../images/profile__avatar.png';
import s from './../../../Profile.module.scss';
import cn from 'classnames';

interface PostPropsType {
  text: string;
}

export const Post = ({ text }: PostPropsType) => {
  let postsProfileBottom = cn(
    s['posts-profile__bottom'],
    s['posts-profile-bottom'],
  );

  return (
    <div className={postsProfileBottom}>
      <div className={s['posts-profile-bottom__avatar']}>
        <img src={profileAvatar} alt="" />
      </div>
      <div className={s['posts-profile-bottom__text']}>{text}</div>
    </div>
  );
};
