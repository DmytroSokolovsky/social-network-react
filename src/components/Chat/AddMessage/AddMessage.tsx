import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getChatStatus } from '../../../redux/selectors/chat-selector';
import { sendMessage } from '../../../redux/chat-reducer';
import cn from 'classnames';
import s from '../Chat.module.scss';

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
      <div className={sendClass}>
        <button
          onClick={handleSendMessage}
          type="submit"
          disabled={chatStatus !== 'ready'}
        >
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};
