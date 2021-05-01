import { createAction } from '@reduxjs/toolkit';

import {
  API_GET_REQUEST,
  // UPDATE_REMOTE_DATA_STATE,
} from '../constants/remoteData';

import { postsUpdateFromRemoteData } from './posts';
import { uiStatusUpdate } from './ui';

export const updateRemoteDataState = createAction(
  'UPDATE_REMOTE_DATA_STATE', (categoryId, postsData) => ({
    payload: { categoryId, postsData },
  }),
);

/* function updateRemoteDataState(categoryId, postsData) {
  return { type: UPDATE_REMOTE_DATA_STATE, payload: { categoryId, postsData } };
} */

function apiGetRequest(categoryId) {
  return { type: API_GET_REQUEST, payload: { categoryId } };
}

export function apiGetSuccess(categoryId, postsData) {
  return (dispatch) => {
    console.log('Action: (apiGetSuccess)');

    dispatch(updateRemoteDataState(categoryId, postsData));
    dispatch(postsUpdateFromRemoteData(categoryId));
  };
}

export function apiResponseResult({ response = null, error = null }) {
  return (dispatch) => {
    console.log('Action: (apiResult)');

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
  };
}

export function callApi(categoryId) {
  return (dispatch, getState) => {
    console.log('Action: (callApi)');

    const cachedData = getState().remoteDataState[categoryId];

    if (typeof cachedData === 'undefined') {
      console.log('Loading category data from API');

      // ----------------------------------------------------------------------------------
      // The async API call logic is now handled by a Redux Saga middleware (./redux/sagas/apiSaga.js).
      // When the apiGetRequest action is dispatched, it is caught by a 'Watcher Saga' (apiWatcherSaga).
      // The watcher then calls the matching 'Worker Saga' (apiWorkerSaga), which does the async
      // API call and then dispatches further actions.
      dispatch(apiGetRequest(categoryId));

      /*
      try {
        const response = await axios({
          method: 'get',
          url: `https://jsonplaceholder.typicode.com/${categoryId}`,
        });

        dispatch(apiGetSuccess(categoryId, response.data));
        dispatch(apiResponseResult({
          response: { ...response, fromApi: true },
        }));
      } catch (error) {
        dispatch(apiResponseResult({ error }));
      }
      */

      // ----------------------------------------------------------------------------------
    } else {
      console.log('Using category data from cache');

      dispatch(postsUpdateFromRemoteData(categoryId));
      dispatch(apiResponseResult({ response: { fromApi: false } }));
    }
  };
}
