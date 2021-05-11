/* eslint-disable max-len */
/*
----------------------------------------------------------------------------------

configureStore()

----------------------------------------------------------------------------------
*/

import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

// The Redux Saga that handles async API calls
import apiWatcherSaga from './sagas/apiSaga';

// The automatically generated slice reducers
import remoteDataReducer from './slices/remoteDataSlice';
import postsReducer from './slices/postsSlice';
import UIReducer from './slices/uiSlice';

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

export default function initStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [sagaMiddleware];
  // Here we could conditionally add more custom middlewares, for example middleware only
  // to be used in development mode.

  const store = configureStore({
    reducer: {
      remoteDataState: remoteDataReducer,
      postsDataState: postsReducer,
      uiState: UIReducer,
    },
    // When adding custom middleware it is necessary to include the default middleware
    // which includes [thunk, immutableStateInvariant, serializableStateInvariant]
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    preloadedState,
    // Enables devTools in development mode
    devTools: process.env.NODE_ENV !== 'production',
    // Optional
    // enhancers: [],
  });

  sagaMiddleware.run(apiWatcherSaga);

  return store;
}

/*
----------------------------------------------------------------------------------

- The old way using createStore()

Required use of createStore, applyMiddleware, compose, combineReducers, etc.

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [thunkMiddleware, sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preLoadedState, composedEnhancers);

  sagaMiddleware.run(apiWatcherSaga);

  return store;
}
----------------------------------------------------------------------------------
*/
