/* eslint-disable no-unused-vars */
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

// Actions
import { postsUpdateFromRemoteData } from './posts';
import { uiStatusUpdate } from './ui';

// Reducer function actions
import { updateRemoteDataState } from '../slices/remoteDataSlice';

/*
----------------------------------------------------------------------------------

createAction()

- The old way:

The usual way to define an action in Redux is to separately declare an action type
constant and an action creator function for constructing actions of that type.

export const API_GET_REQUEST = 'API_GET_REQUEST';

function apiGetRequest(categoryId) {
  return { type: API_GET_REQUEST, payload: { categoryId } };
}

- The Toolkit way:

The createAction helper combines these two declarations into one. It takes an action
type and returns an action creator for that type. The action creator can be called
either without arguments or with a payload to be attached to the action. Also, the
action creator overrides toString() so that the action type becomes its string
representation.

[Option 1]
The short form.
Disadvantage: It is not clear what arguments this action takes.

export const apiGetRequest = createAction('remoteData/apiGetRequest');

[Option 2]
The long form with a 'prepare callback'.
Advantage: It is clear what arguments this action takes and the payload can be
transformed. For example, values added like an ID or timestamp.

export const apiGetRequest = createAction(
  'remoteData/apiGetRequest', ({ categoryId }) => ({
    payload: { categoryId },
  }),
);

----------------------------------------------------------------------------------
*/

export const apiGetRequest = createAction(
  'remoteData/apiGetRequest', ({ categoryId }) => ({
    payload: { categoryId },
  }),
);

/*
----------------------------------------------------------------------------------

createAsyncThunk()

Accepts an action type string and a function that returns a promise,
and generates a thunk that dispatches pending/fulfilled/rejected action types based on
that promise. How to intercept these three actions in a slice is shown in (remoteDataSlice.js)

createAsyncThunk() has a payload creator callback function. The payloadCreator function
can contain whatever logic you need to calculate an appropriate result. The payloadCreator
function will be called with two arguments:

- arg: a single value, containing the first parameter that was passed to the thunk action
creator when it was dispatched.

- thunkAPI: an object containing all of the parameters that are normally passed to a Redux
thunk function (dispatch, getState), as well as additional options:

----------------------------------------------------------------------------------
*/

export const apiGetSuccess = createAsyncThunk(
  'remoteData/apiGetSuccess',
  ({ categoryId, postsData }, { dispatch }) => {
    console.log('Action: (remoteData/apiGetSuccess)');

    dispatch(updateRemoteDataState({ categoryId, postsData }));
    dispatch(postsUpdateFromRemoteData(categoryId));
  },
);

export const apiResponseResult = createAsyncThunk(
  'remoteData/apiResponseResult',
  ({ response = null, error = null }, { dispatch }) => {
    console.log('Action: (remoteData/apiResponseResult)');

    let result = {
      status: null,
      message: null,
      error: null,
    };

    if (error) {
      if (error.response) {
        result = {
          status: 'ERROR',
          message: null,
          error: {
            name: 'Request Error',
            message: `${error.response.status} - ${error.message}`,
          },
        };
      } else if (error.request) {
        result = {
          status: 'ERROR',
          message: null,
          error: {
            name: 'Network Error',
            message: 'The server does not respond!',
          },
        };
      } else {
        result = {
          status: 'ERROR',
          message: null,
          error: {
            name: error.name,
            message: error.message,
          },
        };
      }
    }

    if (response) {
      if (response.fromApi) {
        result = {
          status: 'SUCCESS',
          message: `Server response: ${response.status} OK`,
          error: null,
        };
      } else {
        result = {
          status: 'SUCCESS',
          message: 'Category data loaded from cache',
          error: null,
        };
      }
    }

    dispatch(uiStatusUpdate(result));
  },
);

export const callApi = createAsyncThunk(
  'remoteData/callApi',
  (categoryId, { dispatch, getState }) => {
    console.log('Action: (remoteData/callApi)');

    const cachedData = getState().remoteDataState[categoryId];

    if (typeof cachedData === 'undefined') {
      console.log('Loading category data from API');

      dispatch(apiGetRequest({ categoryId }));
    } else {
      console.log('Using category data from cache');

      dispatch(postsUpdateFromRemoteData(categoryId));
      dispatch(apiResponseResult({ response: { fromApi: false } }));
    }
  },
);
