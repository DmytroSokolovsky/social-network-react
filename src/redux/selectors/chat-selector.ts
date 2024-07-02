import { RootState } from '../store';

export const getMessages = (state: RootState) => state.chat.messages;

export const getChatStatus = (state: RootState) => state.chat.chatStatus;
