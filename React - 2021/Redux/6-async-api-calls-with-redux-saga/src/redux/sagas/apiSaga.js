/* eslint-disable no-unused-vars */
import axios from 'axios';
import { takeEvery, call, put } from 'redux-saga/effects';

import { API_GET_REQUEST } from '../constants/remoteData';

import { apiGetSuccess, apiResponseResult } from '../actions/remoteData';

function callApi(categoryId) {
  return axios({
    method: 'get',
    url: `https://jsonplaceholder.typicode.com/${categoryId}`,
  });
}

function* apiWorkerSaga(action) {
  try {
    console.log('Saga Worker: (apiWorkerSaga)');

    const { categoryId } = action.payload;

    // Option 1: Making the API call in a separate function using call()
    const response = yield call(callApi, categoryId);

    // Option 2: Making the API call directly in the worker
    /*
    const response = yield axios({
      method: 'get',
      url: `https://jsonplaceholder.typicode.com/${categoryId}`,
    });
    */

    yield put(apiGetSuccess(categoryId, response.data));
    yield put(apiResponseResult({
      response: { ...response, fromApi: true },
    }));
  } catch (error) {
    yield put(apiResponseResult({ error }));
  }
}

export default function* apiWatcherSaga() {
  yield takeEvery(API_GET_REQUEST, apiWorkerSaga);
}
