/*
----------------------------------------------------------------------------------

----------------------------------------------------------------------------------
*/

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import { applyMiddleware, compose, createStore } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import createSagaMiddleware from 'redux-saga';

// import apiWatcherSaga from './sagas/apiSaga';

import rootReducer from './reducers/rootReducer';

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
  const middleware = [
    ...getDefaultMiddleware(),
  ];

  const store = configureStore({
    reducer: rootReducer,
    middleware,
    preloadedState,
  });

  return store;
}

/*
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
*/
