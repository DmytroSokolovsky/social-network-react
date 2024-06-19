import { createSlice } from '@reduxjs/toolkit';

let idCounter = 1;

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    posts: [],
  },
  reducers: {
    addPost(state, action) {
      state.posts.push({
        id: idCounter++,
        text: action.payload,
      });
    },
  },
});

export const { addPost } = profileSlice.actions;

export default profileSlice.reducer;
