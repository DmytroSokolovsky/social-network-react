import { RootState } from '../store';

export const getUsersSelector = (state: RootState) => state.users.users;
