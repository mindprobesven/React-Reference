import { ARTICLE_ADD_SUCCESS } from '../constants/root';

/* const initialState = {
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
}; */

export default function articlesReducer(state = {}, action) {
  switch (action.type) {
  case ARTICLE_ADD_SUCCESS: {
    console.log('Dispatched action ARTICLE_ADD_SUCCESS');
    return state;
  }
  default:
    return state;
  }
}
