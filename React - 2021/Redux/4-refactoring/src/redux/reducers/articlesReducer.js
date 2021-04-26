/* eslint-disable no-unused-vars */
import { ARTICLES_STATE_UPDATE } from '../constants/articles';

export default function articlesReducer(state = {}, action) {
  switch (action.type) {
  case ARTICLES_STATE_UPDATE: {
    console.log('articlesReducer: (ARTICLES_STATE_UPDATE)');

    const { byID, allIDs } = action.payload;

    return { ...state, articles: { byID, allIDs } };
  }
  default:
    return state;
  }
}
