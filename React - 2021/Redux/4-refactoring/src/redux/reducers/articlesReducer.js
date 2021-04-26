import { ARTICLE_ADD_SUCCESS } from '../constants/articles';

export default function articlesReducer(state = {}, action) {
  switch (action.type) {
  case ARTICLE_ADD_SUCCESS: {
    console.log('articlesReducer: (ARTICLE_ADD_SUCCESS)');

    const { newArticle, newArticleID } = action.payload;

    const { articles } = state;
    const byID = { ...articles.byID, ...newArticle };
    const allIDs = [...articles.allIDs, newArticleID];

    return { ...state, articles: { byID, allIDs } };
  }
  default:
    return state;
  }
}
