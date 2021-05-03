import axios from 'axios';
import { takeEvery, call, put } from 'redux-saga/effects';

// import { API_GET_REQUEST } from '../constants/remoteData';

import {
  apiGetRequest,
  apiGetSuccess,
  apiResponseResult,
} from '../actions/remoteData';

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

    const response = yield call(callApi, categoryId);

    yield put(apiGetSuccess({ categoryId, postsData: response.data }));
    yield put(apiResponseResult({
      response: { ...response, fromApi: true },
    }));
  } catch (error) {
    yield put(apiResponseResult({ error }));
  }
}

export default function* apiWatcherSaga() {
  // The action apiGetRequest was created with createAction().
  // The action function itself has toString() defined, so that it can be used in place of the type constant.
  // Therefore, [apiGetRequest] === 'API_GET_REQUEST'
  yield takeEvery([apiGetRequest], apiWorkerSaga);
}
