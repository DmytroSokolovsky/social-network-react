import { ProfileType } from '../types/types';
import { APIResponseType, instance } from './api';

export const profileAPI = {
  getProfile(userId: number) {
    return instance
      .get<ProfileType>(`profile/${userId}`)
      .then(response => response.data);
  },

  getStatus(userId: number) {
    return instance
      .get<string>(`profile/status/${userId}`)
      .then(response => response.data);
  },

  setStatus(status: string) {
    return instance
      .put<APIResponseType>('profile/status', {
        status,
      })
      .then(response => response.data);
  },
};
