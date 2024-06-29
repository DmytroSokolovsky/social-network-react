import { RootState } from '../store';

export const getUsersSelector = (state: RootState) => state.users.users;
export const getTotalCount = (state: RootState) => state.users.totalCount;
export const getCount = (state: RootState) => state.users.count;
export const getPage = (state: RootState) => state.users.page;

export const getUsersStatus = (state: RootState) => state.users.usersStatus;
export const getUsersErrorMessage = (state: RootState) =>
  state.users.usersErrorMessage;

export const getFollowStatus = (state: RootState) => state.users.followStatus;
export const getFollowErrorMessage = (state: RootState) =>
  state.users.followErrorMessage;

export const getUnFollowStatus = (state: RootState) =>
  state.users.unFollowStatus;
export const getUnFollowErrorMessage = (state: RootState) =>
  state.users.unFollowErrorMessage;

export const getFollowing = (state: RootState) => state.users.following;

export const getFriendFilter = (state: RootState) => state.users.friendFilter;
export const getTermFilter = (state: RootState) => state.users.termFilter;
