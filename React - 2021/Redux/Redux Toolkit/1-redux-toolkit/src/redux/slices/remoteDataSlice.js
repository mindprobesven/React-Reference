/* eslint-disable max-len */
/* eslint-disable quote-props */
/* eslint-disable no-useless-computed-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/*
----------------------------------------------------------------------------------

createSlice()

Accepts an object of reducer functions, a slice name, and an initial state value,
and automatically generates a slice reducer with corresponding action creators and
action types.

In this example, updateRemoteDataState() is the only action that acts as a reducer
function (updates the final state) and does not have to be defined externally like
a normal action with createAction().

----------------------------------------------------------------------------------
*/
import { createSlice } from '@reduxjs/toolkit';

// import { callApi, apiGetRequest } from '../actions/remoteData';

const initialState = {};

const remoteDataSlice = createSlice({
  name: 'remoteData',
  initialState,
  reducers: {
    // The auto-generated actions
    updateRemoteDataState(state, action) {
      console.log('remoteDataSlice: (updateRemoteDataState)');

      const { categoryId, postsData } = action.payload;
      state[categoryId] = postsData;
    },
  },
  extraReducers: {
    // Method to intercept external actions created with createAction()
    'remoteData/apiGetRequest': (state, action) => {
      console.log('---------------> remoteDataSlice: (remoteData/apiGetRequest)');
    },
    // Method to intercept external actions created with createAsyncThunk()
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
});

export const { updateRemoteDataState } = remoteDataSlice.actions;

const remoteDataReducer = remoteDataSlice.reducer;
export default remoteDataReducer;
