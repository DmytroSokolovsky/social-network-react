import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginResponseType, authAPI } from '../api/auth-api';
import {
  APIResponseType,
  ResultCodesEnum,
  ResultCodesEnumForCaptcha,
} from '../api/api';

interface LoginParametrsType {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const login = createAsyncThunk<
  APIResponseType<LoginResponseType>,
  LoginParametrsType
>(
  'auth/login',

  async (loginData, { dispatch }) => {
    const { email, password, rememberMe } = loginData;
    const data = await authAPI.login(email, password, rememberMe);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(setAuthUserData());
    }
    return data;
  },
);

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

type loginStatusType = 'loading' | 'resolved' | 'rejected';

interface AuthState {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  loginStatus: loginStatusType | null;
  loginErrorMessage: string | null;
}

const initialState: AuthState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
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
      state.isAuth = true;
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
      state.isAuth = false;
    });
    builder.addCase(logout.rejected, (state, action) => {});
  },
});

export default authSlice.reducer;
