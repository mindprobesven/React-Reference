import { combineReducers } from 'redux';

import articlesReducer from './articlesReducer';
import UIReducer from './UIreducer';

const rootReducer = combineReducers({
  // The articlesReducer top-level state object is articlesState
  // The <List> React component shows how to connect to the state of articlesState
  articlesState: articlesReducer,
  // The UIReducer top-level state object is uiState
  // The <Status> React component shows how to connect to the state of uiState
  uiState: UIReducer,
});

export default rootReducer;
