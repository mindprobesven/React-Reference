/* eslint-disable global-require */
import { combineReducers } from 'redux';

import remoteDataReducer from './slices/remoteDataSlice';
import postsReducer from './slices/postsSlice';
import UIReducer from './slices/uiSlice';

console.log('Test');

const rootReducer = combineReducers({
  remoteDataState: remoteDataReducer,
  postsDataState: postsReducer,
  uiState: UIReducer,
});

export default rootReducer;
