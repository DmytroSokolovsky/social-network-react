import { useContext } from 'react';
import s from './Profile.module.scss';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import { ProfilePosts } from './ProfilePosts/ProfilePosts';
import cn from 'classnames';
import { ThemeContext } from '../../context/context';

const Profile = () => {
  const theme = useContext(ThemeContext);

  let profileClass = cn(s.profile, {
    [s.light]: theme === 'light',
    [s.dark]: theme === 'dark',
  });

  return (
    <>
      <div className={profileClass}>
        <ProfileInfo />
        <ProfilePosts />
      </div>
    </>
  );
};

export default Profile;
