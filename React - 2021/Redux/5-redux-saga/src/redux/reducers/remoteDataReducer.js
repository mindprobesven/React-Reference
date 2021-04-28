/* eslint-disable no-unused-vars */
import axios from 'axios';

import { postsUpdateFromRemoteData } from './postsReducer';

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

export function callApi(categoryId) {
  return async (dispatch, getState) => {
    console.log('Action: (callApi)');

    try {
      // The 'response' is the result of the server responding with a status code of 2xx
      const response = await axios({
        method: 'get',
        url: `https://jsonplaceholder.typicode.com/${categoryId}`,
      });

      dispatch(apiGetSuccess(categoryId, response.data));
    } catch (error) {
      // Error handling
      if (error.response) {
        // The request was made and the server responded with a status code != to 2xx
        /*
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        */
      } else if (error.request) {
        // The request was made but no response was received
        /*
        console.log(error.request);
        console.log(error.name);
        console.log(error.message);
        console.log(error.stack);
        */
      } else {
        // Other error
        console.log(error);
      }
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
