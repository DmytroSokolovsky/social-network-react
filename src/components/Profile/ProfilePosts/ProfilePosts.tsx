import s from './../Profile.module.scss';
import cn from 'classnames';
import { useState } from 'react';
import { AddPost } from './AddPost/AddPost';
import { Posts } from './Posts/Posts';
import { getPosts } from '../../../redux/selectors/profile-selector';
import { addPost } from '../../../redux/profile-reducer';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

export const ProfilePosts = () => {
  const posts = useAppSelector(getPosts);
  const dispatch = useAppDispatch();

  const [text, setText] = useState('');

  let profilePosts = cn(s.profile__posts, s['posts-profile']);

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
    <div className={profilePosts}>
      <AddPost handleText={handleText} handleSend={handleSend} text={text} />
      <Posts posts={posts} />
    </div>
  );
};
