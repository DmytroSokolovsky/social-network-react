import { useContext, useEffect } from 'react';
import s from './Chat.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  resetMessages,
  startMessagesListening,
  stopMessagesListening,
} from '../../redux/chat-reducer';
import { getChatStatus } from '../../redux/selectors/chat-selector';
import { Toast } from '../Toast/Toast';
import { Messages } from './Messages/Messages';
import { AddMessage } from './AddMessage/AddMessage';
import cn from 'classnames';
import { ThemeContext } from '../../context/context';

// const Message = ({ message, photo, userId, userName }: ChatMessageDataType) => {
//   return (
//     <div className={s.chat__message}>
//       <div className={s.chat__column}>
//         <div className={s.chat__userPhoto}>
//           {photo ? (
//             <img src={photo} alt={`${userName}'s avatar`} />
//           ) : (
//             <img src={profileAvatar} alt={`${userName}'s avatar`} />
//           )}
//         </div>
//       </div>
//       <div className={s.chat__column}>
//         <div className={s.chat__userName}>{userName}</div>
//         <div className={s.chat__textMessage}>{message}</div>
//       </div>
//     </div>
//   );
// };

// interface AddMessagePropsType {
//   wsChannel: WebSocket | null;
// }

// const AddMessage = ({ wsChannel }: AddMessagePropsType) => {
//   const [message, setMessage] = useState('');
//   const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>(
//     'pending',
//   );

//   useEffect(() => {
//     let openHandler = () => {
//       setReadyStatus('ready');
//     };

//     wsChannel?.addEventListener('open', openHandler);

//     return () => {
//       wsChannel?.removeEventListener('open', openHandler);
//     };
//   }, [wsChannel]);

//   const handleSendMessage = () => {
//     if (!message) {
//       return;
//     }
//     wsChannel?.send(message);
//     setMessage('');
//   };

//   const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setMessage(e.target.value);
//   };

//   return (
//     <div className={s.chat__bottom}>
//       <div className={s.chat__textarea}>
//         <textarea
//           className="textarea"
//           placeholder="Enter your message..."
//           onChange={handleChangeMessage}
//           value={message}
//         ></textarea>
//       </div>
//       <div className={s.chat__send}>
//         <button
//           disabled={wsChannel === null || readyStatus !== 'ready'}
//           onClick={handleSendMessage}
//           type="submit"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// interface MessagesPropsType {
//   wsChannel: WebSocket | null;
// }

// const Messages = ({ wsChannel }: MessagesPropsType) => {
//   const [messages, setMessages] = useState<Array<ChatMessageDataType>>([]);

//   useEffect(() => {
//     const messageHandler = (e: MessageEvent) => {
//       let newMessages = JSON.parse(e.data);
//       setMessages(prevMessages => [...prevMessages, ...newMessages]);
//     };

//     wsChannel?.addEventListener('message', messageHandler);

//     return () => {
//       wsChannel?.removeEventListener('message', messageHandler);
//     };
//   }, [wsChannel]);

//   return (
//     <div className={s.chat__messages}>
//       {messages.map((message, index) => (
//         <Message key={index} {...message} />
//       ))}
//     </div>
//   );
// };

// const Chat = () => {
//   const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);

//   useEffect(() => {
//     let ws: WebSocket;

//     const closeHandler = () => {
//       console.log('CLOSE WS');
//       setTimeout(createChannel, 3000);
//     };

//     function createChannel() {
//       ws?.removeEventListener('close', closeHandler);
//       ws?.close();

//       ws = new WebSocket(
//         'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx',
//       );
//       ws?.addEventListener('close', closeHandler);
//       setWsChannel(ws);
//     }

//     createChannel();

//     return () => {
//       ws.removeEventListener('close', closeHandler);
//       ws.close();
//     };
//   }, []);

//   return (
//     <div className={s.chat}>
//       <div className={s.chat__body}>
//         <Messages wsChannel={wsChannel} />
//         <AddMessage wsChannel={wsChannel} />
//       </div>
//     </div>
//   );
// };

// export default Chat;

const Chat = () => {
  const theme = useContext(ThemeContext);

  const dispatch = useAppDispatch();
  const chatStatus = useAppSelector(getChatStatus);

  useEffect(() => {
    dispatch(startMessagesListening());

    return () => {
      dispatch(stopMessagesListening());
      dispatch(resetMessages());
    };
  }, [dispatch]);

  let chatClass = cn(s.chat, {
    [s.light]: theme === 'light',
    [s.dark]: theme === 'dark',
  });

  return (
    <>
      {chatStatus === 'error' && (
        <Toast errorMessage={'Some error occured. Please, refresh the page'} />
      )}
      <div className={chatClass}>
        <div className={s.chat__body}>
          <Messages />
          <AddMessage />
        </div>
      </div>
    </>
  );
};

export default Chat;
