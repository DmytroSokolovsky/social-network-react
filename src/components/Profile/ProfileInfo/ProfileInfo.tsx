import cn from 'classnames';
import s from './../Profile.module.scss';
import profileAvatar from '../../../images/profile__avatar.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { useEffect, useState } from 'react';
import {
  getProfileUserData,
  getStatus,
  setStatus,
  updateStatus,
} from '../../../redux/profile-reducer';
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
  getUserStatus,
} from '../../../redux/selectors/profile-selector';
import { Preloader } from '../../Preloader/Preloader';
import { Toast } from '../../Toast/Toast';

export const ProfileInfo = () => {
  const [changeStatus, setChangeStatus] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>('');

  let profileHeader = cn(s.profile__header, s['header-profile']);

  const dispatch = useAppDispatch();
  const id = useAppSelector(getId);
  const profileDescription = useAppSelector(getDescription);
  const profileStatus = useAppSelector(getProfileStatus);
  const profileErrorMessage = useAppSelector(getProfileErrorMessage);
  const isAuth = useAppSelector(getIsAuth);

  const statusStatus = useAppSelector(getStatusStatus);
  const statusErrorMessage = useAppSelector(getStatusErrorMessage);
  const status = useAppSelector(getUserStatus);

  const setStatusStatus = useAppSelector(getSetStatusStatus);
  const setStatusErrorMessage = useAppSelector(getSetStatusErrorMessage);

  let profileStatusClass = cn(s['header-profile__status'], s['profile-status']);

  let { userId } = useParams<{ userId?: any }>();

  if (!userId) {
    userId = id;
  }

  let userProfile = userId === id;

  useEffect(() => {
    if (userId !== null) {
      dispatch(getProfileUserData(userId));
      dispatch(getStatus(userId));
    }
  }, [userId, dispatch]);

  const handleStatus = () => {
    if (userProfile) {
      setStatusText(status);
      setChangeStatus(true);
    }
  };

  const handleChangeStatus = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStatusText(e.target.value);
  };

  const handleSetStatus = () => {
    setChangeStatus(false);
    dispatch(updateStatus({ status: statusText, userId: userId }));
  };

  let statusClass = cn(s['profile-status__status'], {
    [s['profile-status__placeholder']]: !status,
  });

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
          {profileStatus === 'resolved' && isAuth && (
            <div className={profileStatusClass}>
              <div className={s['profile-status__text']}>Status:</div>
              {!changeStatus && (
                <div className={statusClass} onDoubleClick={handleStatus}>
                  {status
                    ? status
                    : !status && userProfile
                    ? 'DoubleClick to enter your status...'
                    : ''}
                </div>
              )}
              {changeStatus && (
                <>
                  <div className={s['profile-status__textarea']}>
                    <textarea
                      onChange={handleChangeStatus}
                      value={statusText}
                      placeholder="Enter your status..."
                    ></textarea>
                  </div>
                  <button
                    className={s['profile-status__button']}
                    onClick={handleSetStatus}
                  >
                    <span>Save</span>
                  </button>
                </>
              )}
            </div>
          )}
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
      {/* {profileStatus === 'loading' && <Preloader />} */}
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
