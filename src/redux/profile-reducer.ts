import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProfileType } from '../types/types';
import { SetProfileType, profileAPI } from '../api/profile-api';
import axios from 'axios';
import { APIResponseType, ResultCodesEnum } from '../api/api';
import { RootState } from './store';

let idCounter = 1;

interface PostsType {
  id: number;
  text: string;
}

export const getProfileUserData = createAsyncThunk(
  'auth/getProfileUserData',
  async (userId: number, { dispatch, rejectWithValue }) => {
    try {
      const data = await profileAPI.getProfile(userId);
      dispatch(setProfile(data));
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
  async (userId: number, { dispatch, rejectWithValue }) => {
    try {
      const data = await profileAPI.getStatus(userId);
      dispatch(setStatus(data));
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

export const updatePhoto = createAsyncThunk(
  'auth/updatePhoto',
  async (photoFile: any, { dispatch, rejectWithValue }) => {
    try {
      const data = await profileAPI.updatePhoto(photoFile);
      const photos = data.data.photos;
      if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setPhotos(photos));
      }
      if (data.resultCode === ResultCodesEnum.Error) {
        throw new Error(data.messages[0]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          console.log('Cannot update photo (404)');
          return rejectWithValue('Cannot update photo (404)');
        }
        console.log('An error occurred: ' + error.message);
        return rejectWithValue('An error occurred: ' + error.message);
      } else {
        console.log('An unexpected error occurred');
        return rejectWithValue('An unexpected error occurred');
      }
    }
  },
);

export const updateStatus = createAsyncThunk(
  'auth/updateStatus',
  async (status: string, { dispatch, rejectWithValue }) => {
    try {
      const data = await profileAPI.setStatus(status);
      if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setStatus(status));
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

export const updateProfile = createAsyncThunk<
  APIResponseType,
  SetProfileType,
  { state: RootState }
>(
  'auth/updateProfile',
  async (profileData, { dispatch, rejectWithValue, getState }) => {
    try {
      const data = await profileAPI.updateProfile(profileData);
      if (data.resultCode === ResultCodesEnum.Success) {
        const id = getState().auth.id;
        if (id !== null) {
          dispatch(getProfileUserData(id));
        }
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
  updatePhotoStatus: profileStatusType | null;
  updatePhotoErrorMessage: string | null;
  updateProfileStatus: profileStatusType | null;
  updateProfileErrorMessage: string | null;
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
  updatePhotoStatus: null,
  updatePhotoErrorMessage: null,
  updateProfileStatus: null,
  updateProfileErrorMessage: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<ProfileType>) {
      state.profile = action.payload;
    },
    addPost(state, action: PayloadAction<string>) {
      state.posts.push({
        id: idCounter++,
        text: action.payload,
      });
    },
    setPhotos(state, action: PayloadAction<any>) {
      if (state.profile) {
        state.profile.photos = action.payload;
      }
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getProfileUserData.pending, (state, action) => {
      state.profileStatus = 'loading';
      state.profileErrorMessage = null;
    });
    builder.addCase(getProfileUserData.fulfilled, (state, action) => {
      state.profileStatus = 'resolved';
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
    });
    builder.addCase(getStatus.rejected, (state, action) => {
      state.statusStatus = 'rejected';
      state.statusErrorMessage = action.payload as string;
    });

    builder.addCase(updateStatus.pending, (state, action) => {
      state.setStatusStatus = 'loading';
      state.setStatusErrorMessage = null;
    });
    builder.addCase(updateStatus.fulfilled, (state, action) => {
      state.setStatusStatus = 'resolved';
    });
    builder.addCase(updateStatus.rejected, (state, action) => {
      state.setStatusStatus = 'rejected';
      state.setStatusErrorMessage = action.payload as string;
    });

    builder.addCase(updatePhoto.pending, (state, action) => {
      state.updatePhotoStatus = 'loading';
      state.updatePhotoErrorMessage = null;
    });
    builder.addCase(updatePhoto.fulfilled, (state, action) => {
      state.updatePhotoStatus = 'resolved';
    });
    builder.addCase(updatePhoto.rejected, (state, action) => {
      state.updatePhotoStatus = 'rejected';
      state.updatePhotoErrorMessage = action.payload as string;
    });

    builder.addCase(updateProfile.pending, (state, action) => {
      state.updateProfileStatus = 'loading';
      state.updateProfileErrorMessage = null;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.updateProfileStatus = 'resolved';
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.updateProfileStatus = 'rejected';
      state.updateProfileErrorMessage = action.payload as string;
    });
  },
});

export const { setProfile, addPost, setPhotos, setStatus } =
  profileSlice.actions;

export default profileSlice.reducer;
