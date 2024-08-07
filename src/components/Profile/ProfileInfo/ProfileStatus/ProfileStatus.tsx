import { useContext, useState } from 'react';
import cn from 'classnames';
import s from './../../Profile.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { getUserStatus } from '../../../../redux/selectors/profile-selector';
import { updateStatus } from '../../../../redux/profile-reducer';
import { ThemeContext } from '../../../../context/context';
import { MyButton } from '../../../common/MyButton/MyButton';

interface ProfileStatusPropsType {
  id: number | null;
  userId: any;
}

export const ProfileStatus = ({ id, userId }: ProfileStatusPropsType) => {
  const theme = useContext(ThemeContext);

  const dispatch = useAppDispatch();
  const status = useAppSelector(getUserStatus);
  const [statusText, setStatusText] = useState<string>('');
  const [changeStatus, setChangeStatus] = useState<boolean>(false);

  let userProfile = userId === id;

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
    dispatch(updateStatus(statusText));
  };

  const handleClose = () => {
    setChangeStatus(false);
  };

  let statusClass = cn(s['profile-status__status'], {
    [s['profile-status__placeholder']]: !status,
  });

  let profileStatusClass = cn(
    s['header-profile__status'],
    s['profile-status'],
    {
      [s.light]: theme === 'light',
      [s.dark]: theme === 'dark',
    },
  );

  let statusTextClass = cn(s['profile-status__text'], {
    [s['profile-status__text_user']]: userProfile,
    [s['profile-status__text_active']]: !changeStatus,
  });

  let editClass = cn(s['profile-status__update'], {
    [s['profile-status__update_active']]: changeStatus,
  });

  return (
    <>
      <div className={profileStatusClass}>
        <div className={s['profile-status__top']}>
          <div className={statusTextClass} onClick={handleClose}>
            <span>Status</span>
          </div>
          {userProfile && (
            <div className={editClass} onClick={handleStatus}>
              <span>Edit</span>
            </div>
          )}
        </div>
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
            <div className={s['profile-status__buttons']}>
              <MyButton
                style={{ marginRight: '10px' }}
                onClick={handleSetStatus}
              >
                Save
              </MyButton>
              <button
                className={s['profile-status__cancel']}
                onClick={handleClose}
              >
                <span>Cancel</span>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
