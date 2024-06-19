import axios from 'axios';

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

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '42a9bba6-f409-4ac7-8ae5-0a7a3c454b3e',
  },
});

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
