import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProfileType } from '../types/types';
import { profileAPI } from '../api/profile-api';
import axios from 'axios';

let idCounter = 1;

interface PostsType {
  id: number;
  text: string;
}

interface ProfileState {
  posts: PostsType[];
  profile: ProfileType | null;
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

const initialState: ProfileState = {
  posts: [],
  profile: null,
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
    builder.addCase(getProfileUserData.pending, (state, action) => {});
    builder.addCase(getProfileUserData.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(getProfileUserData.rejected, (state, action) => {});
  },
});

export const { addPost } = profileSlice.actions;

export default profileSlice.reducer;
