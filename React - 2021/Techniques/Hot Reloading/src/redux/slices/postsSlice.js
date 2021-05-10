/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsSetState(state, action) {
      const { categoryId, postsData } = action.payload;
      state[categoryId] = postsData;
    },
  },
});

export const { postsSetState } = postsSlice.actions;

const postsReducer = postsSlice.reducer;
export default postsReducer;
