/* eslint-disable max-len */
/*
----------------------------------------------------------------------------------

configureStore()

Wraps createStore to provide simplified configuration options and good defaults.
It can automatically combine your slice reducers, adds whatever Redux middleware
you supply, includes redux-thunk by default, and enables use of the Redux DevTools
Extension.

----------------------------------------------------------------------------------
*/

import { configureStore } from '@reduxjs/toolkit';
// import { applyMiddleware, compose, createStore } from 'redux';
// import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import apiWatcherSaga from './sagas/apiSaga';

import remoteDataReducer from './slices/remoteDataSlice';
import postsReducer from './reducers/postsReducer';
import UIReducer from './reducers/UIreducer';

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
  // Here we could conditionally add more custom middleware for example ony in development mode.

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
- The old way
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
