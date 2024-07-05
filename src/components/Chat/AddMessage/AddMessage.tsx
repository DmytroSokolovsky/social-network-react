import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getChatStatus } from '../../../redux/selectors/chat-selector';
import { sendMessage } from '../../../redux/chat-reducer';
import cn from 'classnames';
import s from '../Chat.module.scss';
import { MyButton } from '../../common/MyButton/MyButton';

export const AddMessage = () => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');

  const chatStatus = useAppSelector(getChatStatus);

  const handleSendMessage = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message));
    setMessage('');
  };

  const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  let sendClass = cn(s.chat__send, {
    [s.disabled]: chatStatus !== 'ready',
  });

  return (
    <div className={s.chat__bottom}>
      <div className={s.chat__textarea}>
        <textarea
          className="textarea"
          placeholder="Enter your message..."
          onChange={handleChangeMessage}
          value={message}
        ></textarea>
      </div>
      <MyButton
        disabled={chatStatus !== 'ready'}
        type="submit"
        onClick={handleSendMessage}
        className={sendClass}
      >
        Send
      </MyButton>
    </div>
  );
};
