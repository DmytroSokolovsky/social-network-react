import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetUsersResponseType, UserType, usersAPI } from '../api/users-api';
import { RootState } from './store';
import axios from 'axios';
import { followAPI } from '../api/follow-api';
import { ResultCodesEnum } from '../api/api';

export const follow = createAsyncThunk(
  'auth/follow',
  async (userId: number, { dispatch, rejectWithValue }) => {
    try {
      dispatch(followingInProgress({ isFetching: true, id: userId }));
      const data = await followAPI.follow(userId);
      if (data.resultCode === ResultCodesEnum.Error) {
        throw new Error(data.messages[0]);
      }
      dispatch(followUser(userId));
      dispatch(followingInProgress({ isFetching: false, id: userId }));
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          return rejectWithValue('Cannot follow user');
        }
        return rejectWithValue('An error occurred: ' + error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  },
);

export const unFollow = createAsyncThunk(
  'auth/unFollow',
  async (userId: number, { dispatch, rejectWithValue }) => {
    try {
      dispatch(followingInProgress({ isFetching: true, id: userId }));
      const data = await followAPI.unFollow(userId);
      if (data.resultCode === ResultCodesEnum.Error) {
        throw new Error(data.messages[0]);
      }
      dispatch(unFollowUser(userId));
      dispatch(followingInProgress({ isFetching: false, id: userId }));
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          return rejectWithValue('Cannot unfollow user');
        }
        return rejectWithValue('An error occurred: ' + error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  },
);

interface getUsersParamsType {
  count: string;
  page: string;
  term: string;
  friend: string;
}

export const getUsers = createAsyncThunk<
  GetUsersResponseType,
  getUsersParamsType,
  { state: RootState }
>(
  'auth/getUsers',
  async ({ count, page, term, friend }, { dispatch, rejectWithValue }) => {
    try {
      let friendQuery;
      if (friend === 'null') {
        friendQuery = null;
      }
      if (friend === 'true') {
        friendQuery = true;
      }
      if (friend === 'false') {
        friendQuery = false;
      }
      const data = await usersAPI.getUsers(+count, +page, term, friendQuery);
      if (data.error) {
        throw new Error(data.error[0]);
      }
      dispatch(setUsers(data.items));
      dispatch(setTotalCount(data.totalCount));
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          return rejectWithValue('Users not found (404)');
        }
        return rejectWithValue('An error occurred: ' + error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  },
);

type UsersStatusType = 'loading' | 'resolved' | 'rejected';

interface UsersStateType {
  users: Array<UserType> | null;
  totalCount: number | null;
  count: number;
  page: number;
  friendFilter: string;
  termFilter: string;
  isFetching: boolean;
  following: Array<number>;
  usersStatus: UsersStatusType | null;
  usersErrorMessage: string | null;
  followStatus: UsersStatusType | null;
  followErrorMessage: string | null;
  unFollowStatus: UsersStatusType | null;
  unFollowErrorMessage: string | null;
}

interface FollowingInProgressParametrsType {
  isFetching: boolean;
  id: number;
}

const initialState: UsersStateType = {
  users: null,
  totalCount: null,
  count: 20,
  page: 1,
  friendFilter: 'null',
  termFilter: '',
  isFetching: false,
  following: [],
  usersStatus: null,
  usersErrorMessage: null,
  followStatus: null,
  followErrorMessage: null,
  unFollowStatus: null,
  unFollowErrorMessage: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<Array<UserType>>) {
      state.users = action.payload;
    },
    setTotalCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFriendFilter(state, action: PayloadAction<string>) {
      state.friendFilter = action.payload;
    },
    setTermFilter(state, action: PayloadAction<string>) {
      state.termFilter = action.payload;
    },
    followUser(state, action: PayloadAction<number>) {
      const user = state.users?.find(user => user.id === action.payload);
      if (user) {
        user.followed = true;
      }
    },
    unFollowUser(state, action: PayloadAction<number>) {
      const user = state.users?.find(user => user.id === action.payload);
      if (user) {
        user.followed = false;
      }
    },
    followingInProgress(
      state,
      action: PayloadAction<FollowingInProgressParametrsType>,
    ) {
      state.isFetching = action.payload.isFetching;
      state.isFetching
        ? state.following?.push(action.payload.id)
        : (state.following = state.following?.filter(
            id => id !== action.payload.id,
          ));
    },
  },
  extraReducers: builder => {
    builder.addCase(getUsers.pending, (state, action) => {
      state.usersStatus = 'loading';
      state.usersErrorMessage = null;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.usersStatus = 'resolved';
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.usersStatus = 'rejected';
      state.usersErrorMessage = action.payload as string;
    });

    builder.addCase(follow.pending, (state, action) => {
      state.followStatus = 'loading';
      state.followErrorMessage = null;
    });
    builder.addCase(follow.fulfilled, (state, action) => {
      state.followStatus = 'resolved';
    });
    builder.addCase(follow.rejected, (state, action) => {
      state.followStatus = 'rejected';
      state.followErrorMessage = action.payload as string;
    });

    builder.addCase(unFollow.pending, (state, action) => {
      state.unFollowStatus = 'loading';
      state.unFollowErrorMessage = null;
    });
    builder.addCase(unFollow.fulfilled, (state, action) => {
      state.unFollowStatus = 'resolved';
    });
    builder.addCase(unFollow.rejected, (state, action) => {
      state.unFollowStatus = 'rejected';
      state.unFollowErrorMessage = action.payload as string;
    });
  },
});

export const {
  setUsers,
  setTotalCount,
  setPage,
  followUser,
  unFollowUser,
  followingInProgress,
  setFriendFilter,
  setTermFilter,
  setCount,
} = usersSlice.actions;

export default usersSlice.reducer;
