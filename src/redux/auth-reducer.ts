import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginResponseType, authAPI } from '../api/auth-api';
import {
  APIResponseType,
  ResultCodesEnum,
  ResultCodesEnumForCaptcha,
} from '../api/api';
import { securityAPI } from '../api/security-api';

interface LoginParametrsType {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string | null;
}

export const login = createAsyncThunk<
  APIResponseType<LoginResponseType>,
  LoginParametrsType
>(
  'auth/login',

  async (loginData, { rejectWithValue, dispatch }) => {
    try {
      const { email, password, rememberMe, captcha } = loginData;
      const data = await authAPI.login(email, password, rememberMe, captcha);
      if (data.resultCode === ResultCodesEnum.Error) {
        throw new Error(data.messages[0]);
      }
      if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData());
      }
      if (data.resultCode === ResultCodesEnumForCaptcha.Captcha) {
        dispatch(getCaptchaUrl());
        throw new Error(data.messages[0]);
      }
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred!');
      }
    }
  },
);

export const getCaptchaUrl = createAsyncThunk(
  'auth/getCaptchaUrl',

  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await securityAPI.getCaptchaUrl();
      let captchaUrl = data.url;
      return captchaUrl;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue('Failed to get captcha url (404)');
      } else {
        return rejectWithValue('An unknown error occurred!');
      }
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',

  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await authAPI.logout();
      if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(
          setAuthUserData({
            id: null,
            email: null,
            login: null,
            isAuth: false,
          }),
        );
      } else {
        throw new Error('Logout Error');
      }
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred!');
      }
    }
  },
);

export const getAuthUserData = createAsyncThunk(
  'auth/setAuthUserData',

  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await authAPI.me();
      if (data.resultCode === ResultCodesEnum.Error) {
        if (data.messages.length > 0) {
          throw new Error(data.messages[0]);
        }
        throw new Error('Server Error!');
      }
      const { id, email, login } = data.data;
      dispatch(setAuthUserData({ id, email, login, isAuth: true }));

      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred!');
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
  captchaUrl: string | null;
  authMeStatus: loginStatusType | null;
  authMeErrorMessage: string | null;
  loginStatus: loginStatusType | null;
  loginMessage: string | null;
  logoutStatus: loginStatusType | null;
  logoutMessage: string | null;
  captchaStatus: loginStatusType | null;
  captchaErrorMessage: string | null;
}

const initialState: AuthState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
  authMeStatus: null,
  authMeErrorMessage: null,
  loginStatus: null,
  loginMessage: null,
  logoutStatus: null,
  logoutMessage: null,
  captchaStatus: null,
  captchaErrorMessage: null,
};

interface setAuthUserDataType {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUserData(state, action: PayloadAction<setAuthUserDataType>) {
      const { id, email, login, isAuth } = action.payload;
      state.id = id;
      state.email = email;
      state.login = login;
      state.isAuth = isAuth;
    },
  },
  extraReducers: builder => {
    builder.addCase(getAuthUserData.pending, (state, action) => {
      state.authMeStatus = 'loading';
      state.authMeErrorMessage = null;
    });
    builder.addCase(getAuthUserData.fulfilled, (state, action) => {
      state.authMeStatus = 'resolved';
    });
    builder.addCase(getAuthUserData.rejected, (state, action) => {
      state.authMeStatus = 'rejected';
      state.authMeErrorMessage = action.payload as string;
    });

    builder.addCase(login.pending, (state, action) => {
      state.loginStatus = 'loading';
      state.loginMessage = null;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loginStatus = 'resolved';
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginStatus = 'rejected';
      state.loginMessage = action.payload as string;
    });

    builder.addCase(logout.pending, (state, action) => {
      state.logoutMessage = null;
      state.logoutStatus = 'loading';
    });
    builder.addCase(logout.fulfilled, (state, { payload }) => {
      state.logoutStatus = 'resolved';
      state.captchaUrl = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.logoutStatus = 'rejected';
      state.logoutMessage = action.payload as string;
    });

    builder.addCase(getCaptchaUrl.pending, (state, action) => {
      state.captchaStatus = 'loading';
      state.loginStatus = 'rejected';
      state.captchaErrorMessage = null;
      state.captchaUrl = null;
    });
    builder.addCase(getCaptchaUrl.fulfilled, (state, action) => {
      state.captchaStatus = 'resolved';
      state.loginStatus = 'rejected';
      state.captchaUrl = action.payload;
    });
    builder.addCase(getCaptchaUrl.rejected, (state, action) => {
      state.loginStatus = 'rejected';
      state.captchaErrorMessage = action.payload as string;
      state.captchaStatus = 'rejected';
    });
  },
});

export const { setAuthUserData } = authSlice.actions;

export default authSlice.reducer;
