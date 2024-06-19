import { RootState } from '../store';

export const getPosts = (state: RootState) => state.profile.posts;
