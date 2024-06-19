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

interface APIResponseType {
  data: MeType;
  resultCode: ResultCodesEnum;
  messages: Array<string>;
}

export const authAPI = {
  me() {
    return instance
      .get<APIResponseType>('auth/me')
      .then(response => response.data);
  },

  logout() {
    return instance
      .delete<APIResponseType>('auth/login')
      .then(response => response.data);
  },
};
