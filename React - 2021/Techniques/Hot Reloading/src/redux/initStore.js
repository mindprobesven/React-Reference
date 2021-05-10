/* eslint-disable max-len */
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import apiWatcherSaga from './sagas/apiSaga';

import rootReducer from './rootReducer';

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

  // ----------------------------------------------------------------------------------
  // This preserves the Redux state during HMR when making changes to the rootReducer
  // file. It only works when the rootReducer is created in a separate module and
  // by using combineReducers(). Pretty much useless, because making changes to any of the
  // other Redux modules (actions, slices, etc.) resets the Redux state.
  // ----------------------------------------------------------------------------------
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./rootReducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

// ----------------------------------------------------------------------------------
// Running initStore() in App.jsx to get a store object would reset the Redux state
// during every HMR. Instead, it is necessary to export a 'reference' to the store object
// returned by initStore().
// ----------------------------------------------------------------------------------
const store = initStore();

export default store;
