import { RootState } from '../store';

export const getPosts = (state: RootState) => state.profile.posts;
export const getDescription = (state: RootState) => state.profile.profile;
export const getProfileStatus = (state: RootState) =>
  state.profile.profileStatus;
export const getProfileErrorMessage = (state: RootState) =>
  state.profile.profileErrorMessage;
