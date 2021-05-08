import remoteDataReducer from './slices/remoteDataSlice';
import postsReducer from './slices/postsSlice';
import UIReducer from './slices/uiSlice';

console.log('Test');

const rootReducer = {
  remoteDataState: remoteDataReducer,
  postsDataState: postsReducer,
  uiState: UIReducer,
};

export default rootReducer;
