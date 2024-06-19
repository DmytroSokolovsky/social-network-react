import { RootState } from '../store';

export const getPosts = (state: RootState) => state.profile.posts;
export const getDescription = (state: RootState) => state.profile.profile;
