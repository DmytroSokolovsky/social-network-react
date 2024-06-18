import profileAvatar from '../../../../images/profile__avatar.png';
import s from './../../Profile.module.scss';
import cn from 'classnames';

interface PostsPropsType {
  posts: Array<{ id: number; text: string }>;
}

export const Posts = ({ posts }: PostsPropsType) => {
  let postsProfileBottom = cn(
    s['posts-profile__bottom'],
    s['posts-profile-bottom'],
  );

  return (
    <>
      {[...posts].reverse().map(post => {
        return (
          <div className={postsProfileBottom} key={post.id}>
            <div className={s['posts-profile-bottom__avatar']}>
              <img src={profileAvatar} alt="" />
            </div>
            <div className={s['posts-profile-bottom__text']}>{post.text}</div>
          </div>
        );
      })}
      <div className={postsProfileBottom}>
        <div className={s['posts-profile-bottom__avatar']}>
          <img src={profileAvatar} alt="" />
        </div>
        <div className={s['posts-profile-bottom__text']}>Перший пост!</div>
      </div>
    </>
  );
};
