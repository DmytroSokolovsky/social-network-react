import s from './../Profile.module.scss';
import cn from 'classnames';
import { useState } from 'react';
import { AddPost } from './AddPost/AddPost';
import { Posts } from './Posts/Posts';

export const ProfilePosts = () => {
  const [posts, setPosts] = useState<Array<{ id: number; text: string }>>([]);
  const [text, setText] = useState('');
  const [id, setId] = useState(1);

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSend = () => {
    setPosts(prevPosts => [
      ...prevPosts,
      {
        id: id,
        text: text,
      },
    ]);

    setId(prevId => prevId + 1);
    setText('');

    console.log(posts);
  };

  let profilePosts = cn(s.profile__posts, s['posts-profile']);

  return (
    <div className={profilePosts}>
      <AddPost handleText={handleText} handleSend={handleSend} text={text} />
      <Posts posts={posts} />
    </div>
  );
};
