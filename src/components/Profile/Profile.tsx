import s from './Profile.module.scss';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import { ProfilePosts } from './ProfilePosts/ProfilePosts';

const Profile = () => {
  return (
    <div className={s.profile}>
      <ProfileInfo />
      <ProfilePosts />
    </div>
  );
};

export default Profile;
