import { instance } from './api';

interface MeType {
  id: number;
  email: string;
  login: string;
}

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodesEnumForCaptcha {
  Captcha = 10,
}

interface APIResponseType<
  D = {},
  RC = ResultCodesEnum | ResultCodesEnumForCaptcha,
> {
  data: D;
  resultCode: RC;
  messages: Array<string>;
}

interface LoginResponseType {
  userId: number;
}

export const authAPI = {
  me() {
    return instance
      .get<APIResponseType<MeType>>('auth/me')
      .then(response => response.data);
  },

  login(
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: boolean,
  ) {
    return instance
      .post<APIResponseType<LoginResponseType>>('auth/login', {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then(response => response.data);
  },

  logout() {
    return instance
      .delete<APIResponseType>('auth/login')
      .then(response => response.data);
  },
};
