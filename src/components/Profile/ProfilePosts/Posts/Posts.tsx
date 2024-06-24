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
      <Post text={'First post!'} />
      <Post text={'Second post!'} />
      <Post text={'Third post!'} />
      <Post text={'Fourth post'} />
      <Post text={'Fifth post!'} />
      <Post text={'Sixth post!'} />
    </>
  );
};
