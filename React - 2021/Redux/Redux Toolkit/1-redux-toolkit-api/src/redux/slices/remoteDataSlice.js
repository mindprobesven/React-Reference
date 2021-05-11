/* eslint-disable no-param-reassign */
/*
----------------------------------------------------------------------------------

createSlice()

Accepts an object of reducer functions, a slice name, and an initial state value,
and automatically generates a slice reducer with corresponding action creators and
action types.

In this example, remoteDataSetState() is the only action that acts as a reducer
function (updates the final state) and does not have to be defined externally like
a normal action with createAction().

----------------------------------------------------------------------------------
*/
import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const remoteDataSlice = createSlice({
  name: 'remoteData',
  initialState,
  reducers: {
    // The auto-generated reducer actions
    remoteDataSetState(state, action) {
      console.log('remoteDataSlice: (remoteDataSetState)');

      const { categoryId, postsData } = action.payload;
      state[categoryId] = postsData;
    },
  },
  /*
  extraReducers: {
    Method to intercept external actions created with createAction()
    'remoteData/apiGetRequest': (state, action) => {
      console.log('---------------> remoteDataSlice: (remoteData/apiGetRequest)');
    },
    Method to intercept external actions created with createAsyncThunk()
    ['remoteData/callApi/pending']: (state, action) => {
      console.log('---------------> remoteDataSlice: (remoteData/callApi/pending)');
    },
    ['remoteData/callApi/rejected']: (state, action) => {
      console.log('---------------> remoteDataSlice: (remoteData/callApi/rejected)');
    },
    ['remoteData/callApi/fulfilled']: (state, action) => {
      console.log('---------------> remoteDataSlice: (remoteData/callApi/fulfilled)');
    },
  },
  */
});

export const { remoteDataSetState } = remoteDataSlice.actions;

const remoteDataReducer = remoteDataSlice.reducer;
export default remoteDataReducer;
