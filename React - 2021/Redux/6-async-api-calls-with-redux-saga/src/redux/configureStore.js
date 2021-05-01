/*
----------------------------------------------------------------------------------

Redux Saga

Explains how the redux saga middleware is wired up to the redux store.

----------------------------------------------------------------------------------
*/

import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
// Import createSagaMiddleware
import createSagaMiddleware from 'redux-saga';
// Import the redux saga watcher function
import apiWatcherSaga from './sagas/apiSaga';

import rootReducer from './reducers/rootReducer';

const preLoadedState = {
  remoteDataState: {
    articles: [
      { id: 1, title: 'Article 1' },
      { id: 2, title: 'Article 2' },
      { id: 3, title: 'Article 3' },
      { id: 4, title: 'Article 4' },
    ],
  },
};

export default function configureStore() {
  // Create a sagaMiddleware
  const sagaMiddleware = createSagaMiddleware();

  // Add it to middlewares array
  const middlewares = [thunkMiddleware, sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preLoadedState, composedEnhancers);

  // Run the redux saga watcher
  sagaMiddleware.run(apiWatcherSaga);

  return store;
}
