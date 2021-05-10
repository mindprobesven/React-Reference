import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

// Reducer function actions
import { remoteDataSetState } from '../slices/remoteDataSlice';

// Actions
import { postsLoadFromRemoteData } from './posts';
import { uiStatusUpdate } from './ui';

export const apiGetRequest = createAction(
  'remoteData/apiGetRequest',
  ({ categoryId }) => ({ payload: { categoryId } }),
);

export const apiGetSuccess = createAsyncThunk(
  'remoteData/apiGetSuccess',
  ({ categoryId, response }, { dispatch }) => {
    dispatch(remoteDataSetState({ categoryId, postsData: response.data }));
    dispatch(postsLoadFromRemoteData({ categoryId }));
    dispatch(uiStatusUpdate({ response }));
  },
);

export const apiGetFailure = createAsyncThunk(
  'remoteData/apiGetFailure',
  ({ error }, { dispatch }) => {
    dispatch(uiStatusUpdate({ error }));
  },
);

export const loadCachedPostsByCategoryId = createAsyncThunk(
  'remoteData/loadCachedPostsByCategoryId',
  ({ categoryId }, { dispatch }) => {
    dispatch(postsLoadFromRemoteData({ categoryId }));
    dispatch(uiStatusUpdate({ fromCache: true }));
  },
);

export const callApi = createAsyncThunk(
  'remoteData/callApi',
  ({ categoryId }, { dispatch, getState }) => {
    const cachedData = getState().remoteDataState[categoryId];

    if (typeof cachedData === 'undefined') {
      console.log('Load category posts data from API');

      dispatch(apiGetRequest({ categoryId }));
    } else {
      console.log('Load category posts data from cache');

      dispatch(loadCachedPostsByCategoryId({ categoryId }));
    }
  },
);
