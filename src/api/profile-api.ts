import { ContactsType, ProfileType } from '../types/types';
import { APIResponseType, instance } from './api';

interface PhotosType {
  small: string | null;
  large: string | null;
}

interface SavePhotoResponseDataType {
  photos: PhotosType;
}

export interface SetProfileType {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  aboutMe: string;
}

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

  updatePhoto(photoFile: any) {
    let formData = new FormData();
    formData.append('image', photoFile);

    return instance
      .put<APIResponseType<SavePhotoResponseDataType>>(
        'profile/photo',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(response => response.data);
  },

  updateProfile(profileData: SetProfileType) {
    return instance
      .put<APIResponseType>(`profile`, profileData)
      .then(response => response.data);
  },
};
