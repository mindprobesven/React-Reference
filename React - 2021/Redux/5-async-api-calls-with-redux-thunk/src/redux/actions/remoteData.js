/* eslint-disable import/prefer-default-export */
import axios from 'axios';

import { UPDATE_REMOTE_DATA_STATE } from '../constants/remoteData';

import { postsUpdateFromRemoteData } from './posts';
import { uiStatusUpdate } from './ui';

function updateRemoteDataState(categoryId, postsData) {
  return { type: UPDATE_REMOTE_DATA_STATE, payload: { categoryId, postsData } };
}

/*
- Is dispatched after a successful API call.
- Dispatches updateRemoteDataState action to add or update the fetched posts data
in the remoteDataState.
- Dispatches postsUpdateFromRemoteData action. This action will retrieve the posts
data by category ID from the remoteDataState, then normalize the state shape of the data
and store it in postsDataState. The postsDataState is the final prepared data used by the
<List> component.
*/
function apiGetSuccess(categoryId, postsData) {
  return async (dispatch) => {
    console.log('Action: (apiGetSuccess)');

    dispatch(updateRemoteDataState(categoryId, postsData));
    dispatch(postsUpdateFromRemoteData(categoryId));
  };
}

/*
- Dispatches uiStatusUpdate which handles the success and error notifications of the
<Status> UI component.
*/
function apiResponseResult({ response = null, error = null }) {
  return async (dispatch) => {
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
/*
- Is dispatched by the <List> component to request the posts data of a category by ID.
- The posts data is retrieved from the API or re-used from state if it exists. Then
passed on to the next actions in line.
- The action apiResponseResult handles the success and error notifications of the <Status> UI component.
*/
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
        dispatch(apiResponseResult({
          response: { ...response, fromApi: true },
        }));
      } catch (error) {
        dispatch(apiResponseResult({ error }));
      }
    } else {
      console.log('Using category data from cache');

      dispatch(postsUpdateFromRemoteData(categoryId));
      dispatch(apiResponseResult({ response: { fromApi: false } }));
    }
  };
}
