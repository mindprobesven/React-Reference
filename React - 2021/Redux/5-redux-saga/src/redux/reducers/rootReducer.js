import { combineReducers } from 'redux';

import remoteDataReducer from './remoteDataReducer';
import postsReducer from './postsReducer';

import articlesReducer from './articlesReducer';
import UIReducer from './UIreducer';

const rootReducer = combineReducers({
  remoteDataState: remoteDataReducer,
  postsDataState: postsReducer,
  articlesState: articlesReducer,
  uiState: UIReducer,
});

export default rootReducer;
