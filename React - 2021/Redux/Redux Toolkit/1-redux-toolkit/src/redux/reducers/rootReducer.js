// import { combineReducers } from 'redux';

import remoteDataReducer from './remoteDataReducer';
import postsReducer from './postsReducer';
import UIReducer from './UIreducer';

const rootReducer = {
  remoteDataState: remoteDataReducer,
  postsDataState: postsReducer,
  uiState: UIReducer,
};

/*
const rootReducer = combineReducers({
  remoteDataState: remoteDataReducer,
  postsDataState: postsReducer,
  uiState: UIReducer,
});
*/

export default rootReducer;
