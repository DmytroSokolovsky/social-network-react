import { RootState } from '../store';

export const getPosts = (state: RootState) => state.profile.posts;
export const getDescription = (state: RootState) => state.profile.profile;

export const getProfileStatus = (state: RootState) =>
  state.profile.profileStatus;
export const getProfileErrorMessage = (state: RootState) =>
  state.profile.profileErrorMessage;

export const getStatusStatus = (state: RootState) => state.profile.statusStatus;
export const getStatusErrorMessage = (state: RootState) =>
  state.profile.statusErrorMessage;

export const getUserStatus = (state: RootState) => state.profile.status;

export const getSetStatusStatus = (state: RootState) =>
  state.profile.setStatusStatus;
export const getSetStatusErrorMessage = (state: RootState) =>
  state.profile.setStatusErrorMessage;

export const getUpdatePhotoErrorMessage = (state: RootState) =>
  state.profile.updatePhotoErrorMessage;
export const getUpdatePhotoStatus = (state: RootState) =>
  state.profile.updatePhotoStatus;

export const getUpdateProfileErrorMessage = (state: RootState) =>
  state.profile.updateProfileErrorMessage;
export const getUpdateProfileStatus = (state: RootState) =>
  state.profile.updateProfileStatus;
