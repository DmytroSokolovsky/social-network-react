import cn from 'classnames';
import s from './../Profile.module.scss';
import profileAvatar from '../../../images/profile__avatar.png';

export const ProfileInfo = () => {
  let profileHeader = cn(s.profile__header, s['header-profile']);

  return (
    <div className={profileHeader}>
      <div className={s['header-profile__column']}>
        <div className={s['header-profile__avatar']}>
          <img src={profileAvatar} alt="" />
        </div>
      </div>
      <div className={s['header-profile__column']}>
        <div className={s['header-profile__status']}>Status</div>
        <div className={s['header-profile__info']}>Info</div>
      </div>
    </div>
  );
};
