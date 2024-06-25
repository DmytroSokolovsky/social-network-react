import { ChangeEvent } from 'react';
import { updatePhoto } from '../../../../redux/profile-reducer';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { getDescription } from '../../../../redux/selectors/profile-selector';
import s from './../../Profile.module.scss';
import profileAvatar from '../../../../images/profile__avatar.png';
import { getIsAuth } from '../../../../redux/selectors/auth-selector';

interface ProfileAvatarPropsType {
  userProfile: boolean;
}

export const ProfileAvatar = ({ userProfile }: ProfileAvatarPropsType) => {
  const dispatch = useAppDispatch();
  const profileDescription = useAppSelector(getDescription);
  const isAuth = useAppSelector(getIsAuth);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files?.length) {
      dispatch(updatePhoto(e.target.files[0]));
    }
  };

  return (
    <div className={s['header-profile__avatar']}>
      {userProfile && isAuth && (
        <label htmlFor="file-input">
          {profileDescription?.photos?.large && isAuth ? (
            <img src={profileDescription?.photos?.large} alt="" />
          ) : (
            <img src={profileAvatar} alt="" />
          )}
          <div className={s['header-profile__updatePhoto']}>
            <span>Update photo</span>
          </div>
        </label>
      )}
      {userProfile && !isAuth && <img src={profileAvatar} alt="" />}
      {!userProfile && (
        <>
          {profileDescription?.photos?.large && isAuth ? (
            <img src={profileDescription?.photos?.large} alt="" />
          ) : (
            <img src={profileAvatar} alt="" />
          )}
        </>
      )}
      {userProfile && (
        <input
          id="file-input"
          className={s['header-profile__fileInput']}
          type="file"
          onChange={handleFile}
        />
      )}
    </div>
  );
};
