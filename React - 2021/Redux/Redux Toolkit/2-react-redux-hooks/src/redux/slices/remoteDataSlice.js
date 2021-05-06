/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const remoteDataSlice = createSlice({
  name: 'remoteData',
  initialState,
  reducers: {
    remoteDataSetState(state, action) {
      console.log('remoteDataSlice: (remoteDataSetState)');

      const { categoryId, postsData } = action.payload;
      state[categoryId] = postsData;
    },
  },
});

export const { remoteDataSetState } = remoteDataSlice.actions;

const remoteDataReducer = remoteDataSlice.reducer;
export default remoteDataReducer;
