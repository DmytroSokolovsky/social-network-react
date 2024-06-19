import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ResultCodesEnum, authAPI } from '../api/auth-api';

export const logout = createAsyncThunk(
  'auth/logout',

  async () => {
    const data = await authAPI.logout();

    return data;
  },
);

export const setAuthUserData = createAsyncThunk(
  'auth/setAuthUserData',

  async (_, { rejectWithValue }) => {
    try {
      const data = await authAPI.me();

      if (data.resultCode === ResultCodesEnum.Error) {
        throw new Error('Server Error!');
      }
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  },
);

interface AuthState {
  id: number | null;
  email: string | null;
  login: string | null;
  loginStatus: string | null;
  loginErrorMessage: string | null;
}

const initialState: AuthState = {
  id: null,
  email: null,
  login: null,
  loginStatus: null,
  loginErrorMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setAuthUserData.pending, (state, action) => {
      state.loginStatus = 'loading';
      state.loginErrorMessage = null;
    });
    builder.addCase(setAuthUserData.fulfilled, (state, action) => {
      state.loginStatus = 'resolved';
      state.id = action.payload.data.id;
      state.email = action.payload.data.email;
      state.login = action.payload.data.login;
    });
    builder.addCase(setAuthUserData.rejected, (state, action) => {
      state.loginStatus = 'rejected';
      state.loginErrorMessage = action.payload as string;
    });

    builder.addCase(logout.pending, (state, action) => {});
    builder.addCase(logout.fulfilled, (state, { payload }) => {
      state.id = null;
      state.email = null;
      state.login = null;
    });
    builder.addCase(logout.rejected, (state, action) => {});
  },
});

export default authSlice.reducer;
