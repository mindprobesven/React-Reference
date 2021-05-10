/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

console.log('Test');

const initialState = {
  components: {
    statusBar: {
      isShowing: false,
      status: null,
      message: null,
      error: null,
    },
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    uiStatusSetState(state, action) {
      const { statusBar } = action.payload;
      state.components.statusBar = statusBar;
    },
  },
});

export const { uiStatusSetState } = uiSlice.actions;

const uiReducer = uiSlice.reducer;
export default uiReducer;
