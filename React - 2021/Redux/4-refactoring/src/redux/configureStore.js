import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

const preloadedState = {
  articlesState: {
    articles: {
      byID: {
        1: {
          title: 'Title 1',
        },
        2: {
          title: 'Title 2',
        },
        3: {
          title: 'Title 3',
        },
      },
      allIDs: [1, 2, 3],
    },
  },
};

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
