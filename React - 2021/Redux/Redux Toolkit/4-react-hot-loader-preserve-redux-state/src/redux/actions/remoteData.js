import { createAction } from '@reduxjs/toolkit';

// Reducer function actions
import { remoteDataSetState } from '../slices/remoteDataSlice';

// Actions
import { postsLoadFromRemoteData } from './posts';
import { uiStatusUpdate } from './ui';

export const apiGetRequest = createAction(
  'remoteData/apiGetRequest',
  ({ categoryId }) => ({ payload: { categoryId } }),
);

export const apiGetSuccess = ({
  categoryId,
  response,
}) => (dispatch) => {
  dispatch({ type: 'remoteData/apiGetSuccess' });

  dispatch(remoteDataSetState({ categoryId, postsData: response.data }));
  dispatch(postsLoadFromRemoteData({ categoryId }));
  dispatch(uiStatusUpdate({ response }));
};

export const apiGetFailure = ({ error }) => (dispatch) => {
  dispatch({ type: 'remoteData/apiGetFailure' });

  dispatch(uiStatusUpdate({ error }));
};

export const loadCachedPostsByCategoryId = ({ categoryId }) => (dispatch) => {
  dispatch({ type: 'remoteData/loadCachedPostsByCategoryId' });

  dispatch(postsLoadFromRemoteData({ categoryId }));
  dispatch(uiStatusUpdate({ fromCache: true }));
};

export const callApi = ({ categoryId }) => (dispatch, getState) => {
  dispatch({ type: 'remoteData/callApi' });

  const cachedData = getState().remoteDataState[categoryId];

  if (typeof cachedData === 'undefined') {
    console.log('Load category posts data from API');

    dispatch(apiGetRequest({ categoryId }));
  } else {
    console.log('Load category posts data from cache');

    dispatch(loadCachedPostsByCategoryId({ categoryId }));
  }
};
