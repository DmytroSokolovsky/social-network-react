import cn from 'classnames';
import s from './../Profile.module.scss';
import profileAvatar from '../../../images/profile__avatar.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { useEffect } from 'react';
import { getProfileUserData } from '../../../redux/profile-reducer';
import { useParams } from 'react-router-dom';
import { getId } from '../../../redux/selectors/auth-selector';
import {
  getDescription,
  getProfileErrorMessage,
  getProfileStatus,
} from '../../../redux/selectors/profile-selector';
import { Preloader } from '../../Preloader/Preloader';
import { Toast } from '../../Toast/Toast';

export const ProfileInfo = () => {
  let profileHeader = cn(s.profile__header, s['header-profile']);

  const dispatch = useAppDispatch();
  const id = useAppSelector(getId);
  const profileDescription = useAppSelector(getDescription);
  const profileStatus = useAppSelector(getProfileStatus);
  const profileErrorMessage = useAppSelector(getProfileErrorMessage);

  let { userId } = useParams<{ userId?: any }>();

  if (!userId) {
    userId = id;
  }

  useEffect(() => {
    if (userId !== null) {
      dispatch(getProfileUserData(userId));
    }
  });

  return (
    <>
      <div className={profileHeader}>
        <div className={s['header-profile__column']}>
          <div className={s['header-profile__avatar']}>
            {profileDescription?.photos?.large ? (
              <img src={profileDescription?.photos?.large} alt="" />
            ) : (
              <img src={profileAvatar} alt="" />
            )}
          </div>
        </div>
        <div className={s['header-profile__column']}>
          <div className={s['header-profile__status']}>Status</div>
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
      </div>
      {profileStatus === 'loading' && <Preloader />}
      {profileStatus === 'rejected' && (
        <Toast errorMessage={profileErrorMessage} />
      )}
    </>
  );
};
