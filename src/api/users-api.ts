import { PhotosType } from '../types/types';
import { instance } from './api';

export interface UserType {
  id: number;
  name: string;
  status: string;
  photos: PhotosType;
  followed: boolean;
}

interface GetUsersResponseType {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
}

export const usersAPI = {
  getUsers(
    count = 5,
    page = 5270,
    term: string = '',
    friend: null | boolean = null,
  ) {
    return instance
      .get<GetUsersResponseType>(
        `users?page=${page}&count=${count}&term=${term}` +
          (friend === null ? '' : `&friend=${friend}`),
      )
      .then(response => response.data);
  },
};
