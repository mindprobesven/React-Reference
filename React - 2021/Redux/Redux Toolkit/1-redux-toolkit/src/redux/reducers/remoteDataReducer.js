/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createReducer } from '@reduxjs/toolkit';

import { updateRemoteDataState } from '../actions/remoteData';

const initialState = {};

const remoteDataReducer = createReducer(initialState, {
  [updateRemoteDataState]: (state, action) => {
    console.log('remoteDataReducer: (UPDATE_REMOTE_DATA_STATE)');

    const { categoryId, postsData } = action.payload;
    state[categoryId] = postsData;
  },
});

export default remoteDataReducer;

/*
import { UPDATE_REMOTE_DATA_STATE } from '../constants/remoteData';

export default function remoteDataReducer(state = {}, action) {
  switch (action.type) {
  case UPDATE_REMOTE_DATA_STATE: {
    console.log('remoteDataReducer: (UPDATE_REMOTE_DATA_STATE)');

    const { categoryId, postsData } = action.payload;
    return { ...state, [categoryId]: postsData };
  }
  default:
    return state;
  }
}
*/
