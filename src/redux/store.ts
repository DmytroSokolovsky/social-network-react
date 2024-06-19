import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profile-reducer';

const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});

// @ts-ignore
window.__store__ = store;

export default store;
