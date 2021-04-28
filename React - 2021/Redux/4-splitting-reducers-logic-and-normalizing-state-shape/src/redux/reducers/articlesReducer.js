/* eslint-disable no-unused-vars */
/*
----------------------------------------------------------------------------------

articlesReducer

- Updates the top-level state object (articlesState), defined in the rootReducer with;

articles: {
  byID: {},
  allIDs: [],
},

- When all article actions related to add and delete successfully process, the reducer
catches the ARTICLES_STATE_UPDATE action with the updatedArticles object and updates the state.
- Initial state is set by createStore() using a preloadedState. This preloadedState
data could potentialy come from the browser's localStorage or via server-side rendering
to hydate the initial state with data.

----------------------------------------------------------------------------------
*/
import { ARTICLES_STATE_UPDATE } from '../constants/articles';

export default function articlesReducer(state = {}, action) {
  switch (action.type) {
  case ARTICLES_STATE_UPDATE: {
    console.log('articlesReducer: (ARTICLES_STATE_UPDATE)');

    const { updatedArticles } = action.payload;
    return { ...state, articles: updatedArticles };
  }
  default:
    return state;
  }
}
