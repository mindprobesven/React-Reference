import { createStore } from 'redux';

// ----------------------------------------------------------------------------------

// Constants/
// Actions types should be declared as constants to avoid typos and duplicates
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';

// ----------------------------------------------------------------------------------

// Actions
// Actions are objects with two properties; type and payload(optional data to be passed)
// As a best practice actions are wrapped into functions that are exported for reuse.
export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}

export function deleteArticle(payload) {
  return { type: DELETE_ARTICLE, payload };
}

// ----------------------------------------------------------------------------------

// Reducers
// Reducers produce the state of the application.
// A reducer is a function that takes two arguments; the current state and action.
// The state is immutable.
// The only way to change the state is by sending a signal to the store. This signal
// is an action and actions have to be dispatched.
const initialState = {
  articles: [
    { id: 2, title: 'Title 2' },
    { id: 3, title: 'Title 3' },
    { id: 4, title: 'Title 4' },
  ],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
  case ADD_ARTICLE:
    return { ...state, articles: [...state.articles, action.payload] };
  case DELETE_ARTICLE: {
    const articleIdToDelete = action.payload;
    const filteredArticles = state.articles.filter(
      (article) => article.id !== articleIdToDelete,
    );
    return { ...state, articles: filteredArticles };
  }
  default:
    return state;
  }
}

// ----------------------------------------------------------------------------------

// Store
// The 'store' in Redux holds all the application's state
const store = createStore(rootReducer);

export default store;
