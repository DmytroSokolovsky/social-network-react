import s from './../Profile.module.scss';
import cn from 'classnames';
import { useContext, useState } from 'react';
import { AddPost } from './AddPost/AddPost';
import { Posts } from './Posts/Posts';
import { getPosts } from '../../../redux/selectors/profile-selector';
import { addPost } from '../../../redux/profile-reducer';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getIsAuth } from '../../../redux/selectors/auth-selector';
import { ThemeContext } from '../../../context/context';

export const ProfilePosts = () => {
  const theme = useContext(ThemeContext);

  const posts = useAppSelector(getPosts);
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getIsAuth);

  const [text, setText] = useState('');

  let profilePosts = cn(s.profile__posts, s['posts-profile'], {
    [s.light]: theme === 'light',
    [s.dark]: theme === 'dark',
  });

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSend = () => {
    if (text.trim().length > 0) {
      dispatch(addPost(text));
      setText('');
    }
  };

  return (
    <>
      {isAuth && (
        <div className={profilePosts}>
          <AddPost
            handleText={handleText}
            handleSend={handleSend}
            text={text}
          />
          <Posts posts={posts} />
        </div>
      )}
    </>
  );
};
