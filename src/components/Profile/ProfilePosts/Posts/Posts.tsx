import { Post } from './Post/Post';

interface PostsPropsType {
  posts: Array<{ id: number; text: string }>;
}

export const Posts = ({ posts }: PostsPropsType) => {
  return (
    <>
      {[...posts].reverse().map(post => {
        return <Post key={post.id} text={post.text} />;
      })}
      <Post text={'Перший пост!'} />
    </>
  );
};
