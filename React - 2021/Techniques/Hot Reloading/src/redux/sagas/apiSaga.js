import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  apiGetRequest,
  apiGetSuccess,
  apiGetFailure,
} from '../actions/remoteData';

function callApi(categoryId) {
  return axios({
    method: 'get',
    url: `https://jsonplaceholder.typicode.com/${categoryId}`,
  });
}

function* apiWorkerSaga(action) {
  try {
    const { categoryId } = action.payload;

    const response = yield call(callApi, categoryId);

    yield put(apiGetSuccess({ categoryId, response }));
  } catch (error) {
    yield put(apiGetFailure({ error }));
  }
}

export default function* apiWatcherSaga() {
  yield takeEvery([apiGetRequest], apiWorkerSaga);
}
