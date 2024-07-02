import {
  Dispatch,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { ChatMessageDataType, ChatStatusType, chatAPI } from '../api/chat-api';

let _newMessageHandler: ((messages: ChatMessageDataType[]) => void) | null =
  null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = messages => {
      dispatch(messagesReceived(messages));
    };
  }

  return _newMessageHandler;
};

let _statusChangedHandler: ((status: ChatStatusType) => void) | null = null;

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = status => {
      dispatch(statusChanged(status));
    };
  }

  return _statusChangedHandler;
};

export const startMessagesListening = createAsyncThunk(
  'chat/startMessagesListening',
  async (_, { rejectWithValue, dispatch }) => {
    chatAPI.start();
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
  },
);

export const stopMessagesListening = createAsyncThunk(
  'chat/stopMessagesListening',
  async (_, { rejectWithValue, dispatch }) => {
    chatAPI.unSubscribe(
      'messages-received',
      newMessageHandlerCreator(dispatch),
    );
    chatAPI.unSubscribe(
      'status-changed',
      statusChangedHandlerCreator(dispatch),
    );
    chatAPI.stop();
  },
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (message: string, { rejectWithValue, dispatch }) => {
    chatAPI.sendMessage(message);
  },
);

const initialState = {
  messages: [] as ChatMessageDataType[],
  chatStatus: 'pending' as ChatStatusType,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    messagesReceived(state, action: PayloadAction<ChatMessageDataType[]>) {
      state.messages = [...state.messages, ...action.payload];
    },
    statusChanged(state, action: PayloadAction<ChatStatusType>) {
      state.chatStatus = action.payload;
    },
    resetMessages(state) {
      state.messages = [];
    },
  },
});

export const { messagesReceived, statusChanged, resetMessages } =
  chatSlice.actions;

export default chatSlice.reducer;
