import { combineReducers } from 'redux';

import articlesReducer from './articlesReducer';
import UIReducer from './UIreducer';

const rootReducer = combineReducers({
  articlesState: articlesReducer,
  uiState: UIReducer,
});

export default rootReducer;
