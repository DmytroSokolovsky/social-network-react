import cn from 'classnames';
import s from './../Profile.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { useContext, useEffect } from 'react';
import { getProfileUserData, getStatus } from '../../../redux/profile-reducer';
import { useParams } from 'react-router-dom';
import { getId, getIsAuth } from '../../../redux/selectors/auth-selector';
import {
  getProfileErrorMessage,
  getProfileStatus,
  getSetStatusErrorMessage,
  getSetStatusStatus,
  getStatusErrorMessage,
  getStatusStatus,
  getUpdatePhotoErrorMessage,
  getUpdatePhotoStatus,
  getUpdateProfileErrorMessage,
  getUpdateProfileStatus,
} from '../../../redux/selectors/profile-selector';
import { Toast } from '../../common/Toast/Toast';
import { ProfileStatus } from './ProfileStatus/ProfileStatus';
import { ProfileAvatar } from './ProfileAvatar/ProfileAvatar';
import { ProfileDescription } from './ProfileDescription/ProfileDescription';
import { ThemeContext } from '../../../context/context';

export const ProfileInfo = () => {
  const theme = useContext(ThemeContext);

  const dispatch = useAppDispatch();
  const id = useAppSelector(getId);
  const profileStatus = useAppSelector(getProfileStatus);
  const profileErrorMessage = useAppSelector(getProfileErrorMessage);
  const isAuth = useAppSelector(getIsAuth);

  const statusStatus = useAppSelector(getStatusStatus);
  const statusErrorMessage = useAppSelector(getStatusErrorMessage);

  const setStatusStatus = useAppSelector(getSetStatusStatus);
  const setStatusErrorMessage = useAppSelector(getSetStatusErrorMessage);

  const updatePhotoStatus = useAppSelector(getUpdatePhotoStatus);
  const updatePhotoErrorMessage = useAppSelector(getUpdatePhotoErrorMessage);

  const updateProfileErrorMessage = useAppSelector(
    getUpdateProfileErrorMessage,
  );
  const updateProfileStatus = useAppSelector(getUpdateProfileStatus);

  let { userId } = useParams<{ userId?: any }>();

  if (!userId) {
    userId = id;
  }

  let userProfile = +userId === id;

  useEffect(() => {
    if (userId !== null) {
      dispatch(getProfileUserData(userId));
      dispatch(getStatus(userId));
    }
  }, [userId, dispatch]);

  let profileHeader = cn(s.profile__header, s['header-profile'], {
    [s.light]: theme === 'light',
    [s.dark]: theme === 'dark',
  });

  return (
    <>
      <div className={profileHeader}>
        <div className={s['header-profile__column']}>
          <ProfileAvatar userProfile={userProfile} />
          {profileStatus === 'resolved' && isAuth && (
            <ProfileStatus id={id} userId={userId} />
          )}
          {!isAuth && (
            <div className={s['header-profile__warn']}>
              To see profile you should sign in!
            </div>
          )}
        </div>
        {profileStatus === 'resolved' && isAuth && (
          <div className={s['header-profile__column']}>
            <ProfileDescription userProfile={userProfile} userId={userId} />
          </div>
        )}
      </div>
      {profileStatus === 'rejected' && (
        <Toast errorMessage={profileErrorMessage} />
      )}
      {statusStatus === 'rejected' && profileStatus !== 'rejected' && (
        <Toast errorMessage={statusErrorMessage} />
      )}
      {setStatusStatus === 'rejected' && profileStatus !== 'rejected' && (
        <Toast errorMessage={setStatusErrorMessage} />
      )}
      {updatePhotoStatus === 'rejected' && profileStatus !== 'rejected' && (
        <Toast errorMessage={updatePhotoErrorMessage} />
      )}
      {updateProfileStatus === 'rejected' && profileStatus !== 'rejected' && (
        <Toast errorMessage={updateProfileErrorMessage} />
      )}
    </>
  );
};
