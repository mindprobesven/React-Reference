/* eslint-disable max-len */
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import apiWatcherSaga from './sagas/apiSaga';

import rootReducer from './rootReducer';
/* import remoteDataReducer from './slices/remoteDataSlice';
import postsReducer from './slices/postsSlice';
import UIReducer from './slices/uiSlice';

const rootReducer = {
  remoteDataState: remoteDataReducer,
  postsDataState: postsReducer,
  uiState: UIReducer,
}; */

const preloadedState = {
  remoteDataState: {
    articles: [
      { id: 1, title: 'Article 1' },
      { id: 2, title: 'Article 2' },
      { id: 3, title: 'Article 3' },
      { id: 4, title: 'Article 4' },
    ],
  },
};

const initStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [sagaMiddleware];

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
  });

  sagaMiddleware.run(apiWatcherSaga);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./rootReducer', () => {
      console.log('----------------> Caught in initStore');
      store.replaceReducer(rootReducer);
      // store.replaceReducer(store.reducer);
    });
    // module.hot.accept('../App', () => console.log('-----> HERE'));
  }

  return store;
};

const store = initStore();

export default store;
