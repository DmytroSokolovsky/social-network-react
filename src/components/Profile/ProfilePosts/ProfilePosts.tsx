import s from './../Profile.module.scss';
import cn from 'classnames';
import { useState } from 'react';
import { AddPost } from './AddPost/AddPost';
import { Posts } from './Posts/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../../redux/selectors/profile-selector';
import { addPost } from '../../../redux/profile-reducer';

export const ProfilePosts = () => {
  const posts = useSelector(getPosts);
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  let profilePosts = cn(s.profile__posts, s['posts-profile']);

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSend = () => {
    dispatch(addPost(text));
    setText('');
  };

  return (
    <div className={profilePosts}>
      <AddPost handleText={handleText} handleSend={handleSend} text={text} />
      <Posts posts={posts} />
    </div>
  );
};
