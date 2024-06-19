import { PayloadAction, createSlice } from '@reduxjs/toolkit';

let idCounter = 1;

interface PostsType {
  id: number;
  text: string;
}

interface ProfileState {
  posts: PostsType[];
}

const initialState: ProfileState = {
  posts: [],
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
});

export const { addPost } = profileSlice.actions;

export default profileSlice.reducer;
