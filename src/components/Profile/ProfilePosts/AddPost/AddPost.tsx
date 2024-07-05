import { MyButton } from '../../../common/MyButton/MyButton';
import s from './../../Profile.module.scss';

interface AddPostPropsType {
  handleText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSend: () => void;
  text: string;
}

export const AddPost = ({ handleText, handleSend, text }: AddPostPropsType) => {
  return (
    <div className={s['posts-profile__top']}>
      <div className={s['posts-profile__textarea']}>
        <textarea
          placeholder="Введіть новий пост..."
          onChange={handleText}
          value={text}
        ></textarea>
      </div>
      {/* <button onClick={handleSend}>Send</button> */}
      <MyButton onClick={handleSend}>Send</MyButton>
    </div>
  );
};
