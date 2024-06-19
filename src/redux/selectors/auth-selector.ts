import { RootState } from '../store';

export const getLogin = (state: RootState) => state.auth.login;
export const getEmail = (state: RootState) => state.auth.email;
export const getId = (state: RootState) => state.auth.id;
export const getLoginStatus = (state: RootState) => state.auth.loginStatus;
export const getloginErrorMessage = (state: RootState) => {
  return state.auth.loginErrorMessage;
};
