import React from 'react';
import { ChatMessageDataType } from '../../../../api/chat-api';
import { useNavigate } from 'react-router-dom';
import profileAvatar from '../../../../images/profile__avatar.png';
import s from '../../Chat.module.scss';
import { useAppSelector } from '../../../../hooks/hooks';
import { getId } from '../../../../redux/selectors/auth-selector';
import cn from 'classnames';

export const Message = React.memo(
  React.forwardRef<HTMLDivElement, ChatMessageDataType>(
    ({ message, photo, userId, userName }, ref) => {
      const id = useAppSelector(getId);

      const navigate = useNavigate();

      const userProfile = userId === id;

      const handleClick = (userId: number) => {
        navigate(`/profile/${userId}`, { replace: true });
      };

      let messageClass = cn(s.chat__message, {
        [s.user]: userProfile,
      });

      return (
        <>
          {!userProfile && (
            <div className={messageClass} ref={ref}>
              <div className={s.chat__column}>
                <div
                  className={s.chat__userPhoto}
                  onClick={() => handleClick(userId)}
                >
                  {photo ? (
                    <img src={photo} alt={`${userName}'s avatar`} />
                  ) : (
                    <img src={profileAvatar} alt={`${userName}'s avatar`} />
                  )}
                </div>
              </div>
              <div className={s.chat__column}>
                <div className={s.chat__userName}>{userName}</div>
                <div className={s.chat__textMessage}>{message}</div>
              </div>
            </div>
          )}
          {userProfile && (
            <div className={messageClass} ref={ref}>
              <div className={s.chat__column}>
                <div className={s.chat__userName}>{userName}</div>
                <div className={s.chat__textMessage}>{message}</div>
              </div>
              <div className={s.chat__column}>
                <div
                  className={s.chat__userPhoto}
                  onClick={() => handleClick(userId)}
                >
                  {photo ? (
                    <img src={photo} alt={`${userName}'s avatar`} />
                  ) : (
                    <img src={profileAvatar} alt={`${userName}'s avatar`} />
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      );
    },
  ),
);
