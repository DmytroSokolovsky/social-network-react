import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../hooks/hooks';
import { getMessages } from '../../../redux/selectors/chat-selector';
import { Message } from './Message/Message';
import s from '../Chat.module.scss';

export const Messages = () => {
  const messages = useAppSelector(getMessages);
  const messageAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  useEffect(() => {
    if (isAutoScroll) {
      messageAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAutoScroll]);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (
      Math.abs(element.scrollHeight - element.scrollTop) -
        element.clientHeight <
      300
    ) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  return (
    <div className={s.chat__messages} onScroll={scrollHandler}>
      {messages.map((message, index) => (
        <Message
          key={index}
          {...message}
          ref={index === messages.length - 1 ? messageAnchorRef : null}
        />
      ))}
    </div>
  );
};
