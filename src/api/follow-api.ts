import { APIResponseType, instance } from './api';

export const followAPI = {
  follow(userId: number) {
    return instance
      .post<APIResponseType>(`follow/${userId}`)
      .then(response => response.data);
  },

  unFollow(userId: number) {
    return instance
      .delete<APIResponseType>(`follow/${userId}`)
      .then(response => response.data);
  },
};
