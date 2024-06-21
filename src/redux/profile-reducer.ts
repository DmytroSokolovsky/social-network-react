import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProfileType } from '../types/types';
import { profileAPI } from '../api/profile-api';
import axios from 'axios';
import { ResultCodesEnum } from '../api/api';

let idCounter = 1;

interface PostsType {
  id: number;
  text: string;
}

export const getProfileUserData = createAsyncThunk(
  'auth/getProfileUserData',
  async (userId: number, { rejectWithValue }) => {
    try {
      const data = await profileAPI.getProfile(userId);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          return rejectWithValue('Profile not found (404)');
        }
        return rejectWithValue('An error occurred: ' + error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  },
);

export const getStatus = createAsyncThunk(
  'auth/getStatus',
  async (userId: number, { rejectWithValue }) => {
    try {
      const data = await profileAPI.getStatus(userId);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          return rejectWithValue('Status not found (404)');
        }
        return rejectWithValue('An error occurred: ' + error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  },
);

export const setStatus = createAsyncThunk(
  'auth/setStatus',
  async (status: string, { rejectWithValue }) => {
    try {
      const data = await profileAPI.setStatus(status);
      if (data.resultCode === ResultCodesEnum.Success) {
        return data;
      } else {
        throw new Error(data.messages[0]);
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred!');
      }
    }
  },
);

interface updateStatusDataType {
  status: string;
  userId: number;
}

export const updateStatus = createAsyncThunk(
  'auth/setStatus',
  async (data: updateStatusDataType, { dispatch }) => {
    const { status, userId } = data;
    dispatch(setStatus(status));

    setTimeout(() => {
      dispatch(getStatus(userId));
    }, 1);
  },
);

type profileStatusType = 'loading' | 'resolved' | 'rejected';

interface ProfileState {
  posts: PostsType[];
  profile: ProfileType | null;
  profileErrorMessage: string | null;
  profileStatus: profileStatusType | null;
  status: string;
  statusStatus: profileStatusType | null;
  statusErrorMessage: string | null;
  setStatusStatus: profileStatusType | null;
  setStatusErrorMessage: string | null;
}

const initialState: ProfileState = {
  posts: [],
  profile: null,
  profileErrorMessage: null,
  profileStatus: null,
  status: '',
  statusStatus: null,
  statusErrorMessage: null,
  setStatusStatus: null,
  setStatusErrorMessage: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<string>) {
      state.posts.push({
        id: idCounter++,
        text: action.payload,
      });
    },
  },
  extraReducers: builder => {
    builder.addCase(getProfileUserData.pending, (state, action) => {
      state.profileStatus = 'loading';
      state.profileErrorMessage = null;
    });
    builder.addCase(getProfileUserData.fulfilled, (state, action) => {
      state.profileStatus = 'resolved';
      state.profile = action.payload;
    });
    builder.addCase(getProfileUserData.rejected, (state, action) => {
      state.profileStatus = 'rejected';
      state.profileErrorMessage = action.payload as string;
    });

    builder.addCase(getStatus.pending, (state, action) => {
      state.statusStatus = 'loading';
      state.statusErrorMessage = null;
    });
    builder.addCase(getStatus.fulfilled, (state, action) => {
      state.statusStatus = 'resolved';
      state.status = action.payload;
    });
    builder.addCase(getStatus.rejected, (state, action) => {
      state.statusStatus = 'rejected';
      state.statusErrorMessage = action.payload as string;
    });

    builder.addCase(setStatus.pending, (state, action) => {
      state.setStatusStatus = 'loading';
      state.setStatusErrorMessage = null;
    });
    builder.addCase(setStatus.fulfilled, (state, action) => {
      state.setStatusStatus = 'resolved';
    });
    builder.addCase(setStatus.rejected, (state, action) => {
      state.setStatusStatus = 'rejected';
      state.setStatusErrorMessage = action.payload as string;
    });
  },
});

export const { addPost } = profileSlice.actions;

export default profileSlice.reducer;
