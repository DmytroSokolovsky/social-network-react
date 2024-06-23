import cn from 'classnames';
import s from './../Profile.module.scss';
import profileAvatar from '../../../images/profile__avatar.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { useEffect } from 'react';
import { getProfileUserData, getStatus } from '../../../redux/profile-reducer';
import { useParams } from 'react-router-dom';
import { getId, getIsAuth } from '../../../redux/selectors/auth-selector';
import {
  getDescription,
  getProfileErrorMessage,
  getProfileStatus,
  getSetStatusErrorMessage,
  getSetStatusStatus,
  getStatusErrorMessage,
  getStatusStatus,
} from '../../../redux/selectors/profile-selector';
import { Toast } from '../../Toast/Toast';
import { ProfileStatus } from './ProfileStatus/ProfileStatus';

export const ProfileInfo = () => {
  let profileHeader = cn(s.profile__header, s['header-profile']);

  const dispatch = useAppDispatch();
  const id = useAppSelector(getId);
  const profileDescription = useAppSelector(getDescription);
  const profileStatus = useAppSelector(getProfileStatus);
  const profileErrorMessage = useAppSelector(getProfileErrorMessage);
  const isAuth = useAppSelector(getIsAuth);

  const statusStatus = useAppSelector(getStatusStatus);
  const statusErrorMessage = useAppSelector(getStatusErrorMessage);

  const setStatusStatus = useAppSelector(getSetStatusStatus);
  const setStatusErrorMessage = useAppSelector(getSetStatusErrorMessage);

  let { userId } = useParams<{ userId?: any }>();

  if (!userId) {
    userId = id;
  }

  useEffect(() => {
    if (userId !== null) {
      dispatch(getProfileUserData(userId));
      dispatch(getStatus(userId));
    }
  }, [userId, dispatch]);

  return (
    <>
      <div className={profileHeader}>
        <div className={s['header-profile__column']}>
          <div className={s['header-profile__avatar']}>
            {profileDescription?.photos?.large && isAuth ? (
              <img src={profileDescription?.photos?.large} alt="" />
            ) : (
              <img src={profileAvatar} alt="" />
            )}
          </div>
          <ProfileStatus id={id} userId={userId} />
        </div>
        {profileStatus === 'resolved' && isAuth && (
          <div className={s['header-profile__column']}>
            <div className={s['header-profile__info']}>Info</div>
            <div>About me: {profileDescription?.aboutMe}</div>
            <br />
            <div>Contacts</div>
            <div>facebook: {profileDescription?.contacts.facebook}</div>
            <div>github: {profileDescription?.contacts.github}</div>
            <div>instagram: {profileDescription?.contacts.instagram}</div>
            <div>mainLink: {profileDescription?.contacts.mainLink}</div>
            <div>twitter: {profileDescription?.contacts.twitter}</div>
            <div>vk: {profileDescription?.contacts.vk}</div>
            <div>website: {profileDescription?.contacts.website}</div>
            <div>youtube: {profileDescription?.contacts.youtube}</div>
            <br />
            <div>fullName: {profileDescription?.fullName}</div>
            <div>lookingForAJob: {profileDescription?.lookingForAJob}</div>
            <div>
              lookingForAJobDescription:{' '}
              {profileDescription?.lookingForAJobDescription}
            </div>
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
    </>
  );
};
