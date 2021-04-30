import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

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
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  // Instead of passing 'undefined', we pass a preLoadedState which contains
  // some posts from the 'todos' category. This data could be coming from the
  // browser's localStorage or via server-side render.
  const store = createStore(rootReducer, preLoadedState, composedEnhancers);

  return store;
}
