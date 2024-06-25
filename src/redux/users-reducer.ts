import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserType, usersAPI } from '../api/users-api';

export const getUsers = createAsyncThunk(
  'auth/getUsers',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const data = await usersAPI.getUsers();
      dispatch(setUsers(data.items));
      dispatch(setTotalCount(data.totalCount));
      return data;
    } catch (error) {
      // if (axios.isAxiosError(error)) {
      //   if (error.response && error.response.status === 404) {
      //     return rejectWithValue('Profile not found (404)');
      //   }
      //   return rejectWithValue('An error occurred: ' + error.message);
      // } else {
      //   return rejectWithValue('An unexpected error occurred');
      // }
    }
  },
);

interface UsersStateType {
  users: Array<UserType> | null;
  totalCount: number | null;
  count: number;
  page: number;
}

const initialState: UsersStateType = {
  users: null,
  totalCount: null,
  count: 5,
  page: 1,
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
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: builder => {
    // builder.addCase(getProfileUserData.pending, (state, action) => {});
    // builder.addCase(getProfileUserData.fulfilled, (state, action) => {});
    // builder.addCase(getProfileUserData.rejected, (state, action) => {});
  },
});

export const { setUsers, setTotalCount, setPage } = usersSlice.actions;

export default usersSlice.reducer;
