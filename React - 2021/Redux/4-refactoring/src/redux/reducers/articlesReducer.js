/* eslint-disable no-unused-vars */
/*
----------------------------------------------------------------------------------

articlesReducer

- Updates the top-level state (articlesState), defined in the rootReducer
- In this example, the actions which handle adding and removing an article, will
all provide an already prepared and updated state object (updatedArticles) to
the articlesReducer in the payload, when dispatching ARTICLES_STATE_UPDATE.
This minimzed the work the reducer has to do and keeps it lean and fast.
- articlesReducer does not set its own initial state. Instead, createStore() in
configureStore.js sets the initial state of articlesState via a preloadedState.
The preloadedState makes it possible to hydrate initial data coming from the
browser's localStorage or from server-side rendering.

----------------------------------------------------------------------------------
*/
import { ARTICLES_STATE_UPDATE } from '../constants/articles';

export default function articlesReducer(state = {}, action) {
  switch (action.type) {
  // This action receives an already prepared and updated 'updatedArticles'
  // state object in its payload to keep the reducer lean and fast.
  case ARTICLES_STATE_UPDATE: {
    console.log('articlesReducer: (ARTICLES_STATE_UPDATE)');

    const { updatedArticles } = action.payload;
    return { ...state, articles: updatedArticles };
  }
  default:
    return state;
  }
}
