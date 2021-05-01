/*
----------------------------------------------------------------------------------

Configuring the store

- All the logic related to configuring the store - including initial state, importing
reducers, middleware, and enhancers - is handled in a dedicated file (configureStore.js).

- A preloadedState can be passed to createStore() to initially hydrate the state of one
more reducers. In this example, only the articlesReducer (articlesState) receives an
initial state to start the articles list off with three existing articles. This data
could also come from a browser's localStorage or via server-side.

----------------------------------------------------------------------------------
*/
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
  /*
  Defining middleware and enhances as arrays allows us to easily add more middlware
  conditionally. For example a middleware that should only be added during development
  mode.

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(someDevelopmentOnlyMiddleware);
  }
  */
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
