import { RootState } from '../store';

export const getLogin = (state: RootState) => state.auth.login;
export const getEmail = (state: RootState) => state.auth.email;
export const getId = (state: RootState) => state.auth.id;

export const getIsAuth = (state: RootState) => {
  return state.auth.isAuth;
};

export const getAuthMeStatus = (state: RootState) => state.auth.authMeStatus;
export const getAuthMeErrorMessage = (state: RootState) => {
  return state.auth.authMeErrorMessage;
};

export const getLoginStatus = (state: RootState) => {
  return state.auth.loginStatus;
};
export const getLoginMessage = (state: RootState) => {
  return state.auth.loginMessage;
};

export const getLogoutStatus = (state: RootState) => {
  return state.auth.logoutStatus;
};
export const getLogoutMessage = (state: RootState) => {
  return state.auth.logoutMessage;
};

export const getCaptchaUrl = (state: RootState) => {
  return state.auth.captchaUrl;
};

export const getCaptchaStatus = (state: RootState) => {
  return state.auth.captchaStatus;
};
export const getCaptchaErrorMessage = (state: RootState) => {
  return state.auth.captchaErrorMessage;
};
