/*
----------------------------------------------------------------------------------

The Toolkit way of creating a reducer with createReducer():

createReducer(): that lets you supply a lookup table of action types to case reducer
functions, rather than writing switch statements. In addition, it automatically uses
the immer library to let you write simpler immutable updates with normal mutative code,
like state.todos[3].completed = true.

import { createReducer } from '@reduxjs/toolkit';

import { updateRemoteDataState } from '../actions/remoteData';

const initialState = {};

const remoteDataReducer = createReducer(initialState, {
  [updateRemoteDataState]: (state, action) => {
    console.log('remoteDataReducer: (updateRemoteDataState)');

    const { categoryId, postsData } = action.payload;
    state[categoryId] = postsData;
  },
});

export default remoteDataReducer;
----------------------------------------------------------------------------------
*/

/*
----------------------------------------------------------------------------------

The old way of creating a reducer:

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
----------------------------------------------------------------------------------
*/
