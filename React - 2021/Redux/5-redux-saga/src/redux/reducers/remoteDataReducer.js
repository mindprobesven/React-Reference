/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import axios from 'axios';

import { postsUpdateFromRemoteData } from './postsReducer';
import { uiStatusUpdate } from '../actions/ui';

const UPDATE_REMOTE_DATA_STATE = 'UPDATE_REMOTE_DATA_STATE';

function updateRemoteDataState(categoryId, postsData) {
  return { type: UPDATE_REMOTE_DATA_STATE, payload: { categoryId, postsData } };
}

/*
- Is dispatched after a successful API call
- dispatches updateRemoteDataState action to add or update the fetched category data
in the remoteDataState.
*/
function apiGetSuccess(categoryId, postsData) {
  return async (dispatch, getState) => {
    console.log('Action: (apiGetSuccess)');

    dispatch(updateRemoteDataState(categoryId, postsData));
    dispatch(postsUpdateFromRemoteData(categoryId));
  };
}

function apiResponseResult({ response = null, error = null }) {
  return async (dispatch, getState) => {
    console.log('Action: (apiResult)');

    let result = {
      status: null,
      message: null,
      error: null,
    };

    if (error) {
      // Error handling
      if (error.response) {
        // The request was made and the server responded with a status code != to 2xx
        result = {
          status: 'ERROR',
          message: null,
          error: {
            name: 'Request Error',
            message: `${error.response.status} - ${error.message}`,
          },
        };
      } else if (error.request) {
        // The request was made but no response was received
        result = {
          status: 'ERROR',
          message: null,
          error: {
            name: 'Network Error',
            message: 'The server does not respond!',
          },
        };
      } else {
        // Other error
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
      switch (response.from) {
      case 'api':
        result = {
          status: 'SUCCESS',
          message: `Server response: ${response.status} OK`,
          error: null,
        };
        break;
      case 'cache':
        result = {
          status: 'SUCCESS',
          message: 'Category data loaded from cache',
          error: null,
        };
        break;
      default:
        break;
      }
    }

    dispatch(uiStatusUpdate(result));
  };
}

export function callApi(categoryId) {
  return async (dispatch, getState) => {
    console.log('Action: (callApi)');

    const cachedData = getState().remoteDataState[categoryId];

    if (typeof cachedData === 'undefined') {
      console.log('Loading category data from API');
      try {
        // The 'response' is the result of the server responding with a status code of 2xx
        const response = await axios({
          method: 'get',
          url: `https://jsonplaceholder.typicode.com/${categoryId}`,
        });

        dispatch(apiGetSuccess(categoryId, response.data));
        dispatch(apiResponseResult({ response: { ...response, from: 'api' } }));
      } catch (error) {
        dispatch(apiResponseResult({ error }));
      }
    } else {
      console.log('Using category data from cache');

      dispatch(apiGetSuccess(categoryId, cachedData));
      dispatch(apiResponseResult({ response: { from: 'cache' } }));
    }
  };
}

export default function remoteDataReducer(state = {}, action) {
  switch (action.type) {
  case 'UPDATE_REMOTE_DATA_STATE': {
    console.log('remoteDataReducer: (UPDATE_REMOTE_DATA_STATE)');

    const { categoryId, postsData } = action.payload;
    return { ...state, [categoryId]: postsData };
  }
  default:
    return state;
  }
}
