export interface ChatMessageDataType {
  message: string;
  photo: string;
  userId: number;
  userName: string;
}

export type ChatStatusType = 'pending' | 'ready' | 'error';

type MessagesReceivedSubscriberType = (messages: ChatMessageDataType[]) => void;
type StatusChangedSubscriberType = (status: ChatStatusType) => void;

type EventsNameTypes = 'messages-received' | 'status-changed';

const subscribers = {
  'messages-received': [] as MessagesReceivedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[],
};

let ws: WebSocket | null = null;

const closeHandler = () => {
  notifySubscribersAboutStatus('pending');
  setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
  let newMessages = JSON.parse(e.data);
  subscribers['messages-received'].forEach(s => s(newMessages));
};

const openHandler = () => {
  notifySubscribersAboutStatus('ready');
};

const errorHandler = () => {
  notifySubscribersAboutStatus('error');
};

const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler);
  ws?.removeEventListener('message', messageHandler);
  ws?.removeEventListener('open', openHandler);
  ws?.removeEventListener('error', errorHandler);
};

const notifySubscribersAboutStatus = (status: ChatStatusType) => {
  subscribers['status-changed'].forEach(s => s(status));
};

function createChannel() {
  cleanUp();
  ws?.close();
  ws = new WebSocket(
    'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx',
  );
  notifySubscribersAboutStatus('pending');
  ws?.addEventListener('close', closeHandler);
  ws?.addEventListener('message', messageHandler);
  ws?.addEventListener('open', openHandler);
  ws?.addEventListener('error', errorHandler);
}

export const chatAPI = {
  start() {
    createChannel();
  },

  stop() {
    subscribers['messages-received'] = [];
    subscribers['status-changed'] = [];
    cleanUp();
    ws?.close();
  },

  subscribe(
    eventName: EventsNameTypes,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType,
  ) {
    // @ts-ignore
    subscribers[eventName].push(callback);
    return () => {
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(
        // @ts-ignore
        s => s !== callback,
      );
    };
  },

  unSubscribe(
    eventName: EventsNameTypes,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType,
  ) {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
  },

  sendMessage(message: string) {
    ws?.send(message);
  },
};
