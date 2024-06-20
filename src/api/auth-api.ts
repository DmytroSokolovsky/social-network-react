import { APIResponseType, instance } from './api';

interface MeType {
  id: number;
  email: string;
  login: string;
}

export interface LoginResponseType {
  userId: number;
}

export const authAPI = {
  me() {
    return instance
      .get<APIResponseType<MeType>>('auth/me')
      .then(response => response.data);
  },

  login(email: string, password: string, rememberMe: boolean) {
    return instance
      .post<APIResponseType<LoginResponseType>>('auth/login', {
        email,
        password,
        rememberMe,
      })
      .then(response => response.data);
  },

  logout() {
    return instance
      .delete<APIResponseType>('auth/login')
      .then(response => response.data);
  },
};
