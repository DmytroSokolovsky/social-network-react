import { useAppSelector } from '../../../../hooks/hooks';
import { getDescription } from '../../../../redux/selectors/profile-selector';
import cn from 'classnames';
import s from './../../Profile.module.scss';
import { useContext, useState } from 'react';
import { EditDescription } from './EditDescription/EditDescription';
import { ThemeContext } from '../../../../context/context';

interface ProfileInfoPropsType {
  userProfile: boolean;
  userId: number;
}

export const ProfileDescription = ({
  userProfile,
  userId,
}: ProfileInfoPropsType) => {
  const theme = useContext(ThemeContext);

  const [editDescription, setEditDescription] = useState(false);

  const profileDescription = useAppSelector(getDescription);

  const hasContacts =
    profileDescription?.contacts?.facebook ||
    profileDescription?.contacts?.github ||
    profileDescription?.contacts?.instagram ||
    profileDescription?.contacts?.mainLink ||
    profileDescription?.contacts?.twitter ||
    profileDescription?.contacts?.vk ||
    profileDescription?.contacts?.website ||
    profileDescription?.contacts?.youtube;

  const handleDescription = () => {
    setEditDescription(false);
  };

  const handleUpdateDescription = () => {
    setEditDescription(true);
  };

  let descriptionClass = cn(
    s['header-profile__description'],
    s['profile-description'],
    {
      [s.light]: theme === 'light',
      [s.dark]: theme === 'dark',
    },
  );

  let contactsClass = cn(s['header-profile__contacts'], s['profile-contacts'], {
    [s.light]: theme === 'light',
    [s.dark]: theme === 'dark',
  });

  let infoClass = cn(s['profile-description__info'], {
    [s['profile-description__info_user']]: userProfile,
    [s['profile-description__info_active']]: !editDescription,
    [s.light]: theme === 'light',
    [s.dark]: theme === 'dark',
  });

  let updateClass = cn(s['profile-description__update'], {
    [s['profile-description__update_active']]: editDescription,
  });

  return (
    <div className={descriptionClass}>
      <div className={s['profile-description__title']}>
        <div className={infoClass} onClick={handleDescription}>
          <span>Info</span>
        </div>
        {userProfile && (
          <div className={updateClass} onClick={handleUpdateDescription}>
            <span>Edit</span>
          </div>
        )}
      </div>
      {!editDescription && (
        <>
          <div className={s['profile-description__general']}>
            {profileDescription?.fullName && (
              <div className={s['profile-description__line']}>
                <span>Full name: </span>
                {profileDescription?.fullName}
              </div>
            )}
            {profileDescription?.aboutMe && (
              <div className={s['profile-description__line']}>
                <span>About me: </span>
                {profileDescription?.aboutMe}
              </div>
            )}
            <div className={s['profile-description__line']}>
              <span>Looking for a job: </span>
              {profileDescription?.lookingForAJob ? 'Yes' : 'No'}
            </div>
            {profileDescription?.lookingForAJobDescription && (
              <div className={s['profile-description__line']}>
                <span>Looking for a job description: </span>
                {profileDescription?.lookingForAJobDescription}
              </div>
            )}
          </div>
          <div className={contactsClass}>
            {hasContacts && (
              <div className={s['profile-contacts__title']}>Contacts</div>
            )}
            {profileDescription?.contacts?.facebook && (
              <div className={s['profile-contacts__line']}>
                <span>Facebook: </span>
                {profileDescription?.contacts?.facebook}
              </div>
            )}
            {profileDescription?.contacts?.github && (
              <div className={s['profile-contacts__line']}>
                <span>Github: </span>
                {profileDescription?.contacts?.github}
              </div>
            )}
            {profileDescription?.contacts?.instagram && (
              <div className={s['profile-contacts__line']}>
                <span>Instagram: </span>
                {profileDescription?.contacts?.instagram}
              </div>
            )}
            {profileDescription?.contacts?.mainLink && (
              <div className={s['profile-contacts__line']}>
                <span>Main link: </span>
                {profileDescription?.contacts?.mainLink}
              </div>
            )}
            {profileDescription?.contacts?.twitter && (
              <div className={s['profile-contacts__line']}>
                <span>Twitter: </span>
                {profileDescription?.contacts?.twitter}
              </div>
            )}
            {profileDescription?.contacts?.vk && (
              <div className={s['profile-contacts__line']}>
                <span>VK: </span>
                {profileDescription?.contacts?.vk}
              </div>
            )}
            {profileDescription?.contacts?.website && (
              <div className={s['profile-contacts__line']}>
                <span>Website: </span>
                {profileDescription?.contacts?.website}
              </div>
            )}
            {profileDescription?.contacts?.youtube && (
              <div className={s['profile-contacts__line']}>
                <span>Youtube: </span>
                {profileDescription?.contacts?.youtube}
              </div>
            )}
          </div>
        </>
      )}
      {editDescription && (
        <EditDescription
          setEditDescription={setEditDescription}
          userId={userId}
        />
      )}
    </div>
  );
};
