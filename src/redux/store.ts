import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profile-reducer';
import authReducer from './auth-reducer';
import usersReducer from './users-reducer';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: authReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.__store__ = store;

export default store;
