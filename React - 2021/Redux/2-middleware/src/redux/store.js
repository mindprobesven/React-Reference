/* eslint-disable func-names */
import { createStore, applyMiddleware, compose } from 'redux';

// ----------------------------------------------------------------------------------

// Constants
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const HANDLE_ERROR = 'HANDLE_ERROR';
export const RESET_ERROR = 'RESET_ERROR';

// ----------------------------------------------------------------------------------

// Actions
export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}

export function deleteArticle(payload) {
  return { type: DELETE_ARTICLE, payload };
}

export function handleError(payload) {
  return { type: HANDLE_ERROR, payload };
}

export function resetError() {
  return { type: RESET_ERROR };
}

// ----------------------------------------------------------------------------------

// Middleware
// A Redux middleware is a function that is able to intercept actions before they reach the reducer.
// In a middleware you can access getState and dispatch middlewareFunc({ getState, dispatch })
export function forbiddenWordsMiddleware({ dispatch }) {
  return function (next) {
    return function (action) {
      console.log('Middleware forbiddenWordsMiddleware intercepting...');

      // This middleware only intercepts actions of type ADD_ARTICLE
      // It will check if bad words are in the title, then it will either
      // dispatch an error action or continue with the ADD_ARTICLE action.
      if (action.type === ADD_ARTICLE) {
        const forbiddenWords = ['spam', 'money'];
        const foundWord = forbiddenWords.filter(
          (word) => action.payload.title.includes(word),
        );

        if (foundWord.length) {
          // The middleware can dispatch another action if necessary.
          // For example here the handleError() action gets dispatched.
          // The reducer will execute this action and update the Redux store state
          // with this new error data. A React component can then catch the error state
          // and update it's UI (Show an error message to the user).
          return dispatch(handleError({
            type: 'INVALID_TITLE',
            message: 'Found a bad word!',
            stack: ADD_ARTICLE,
          }));
        }
      }
      // next(action) will move the application forward, either to the next middleware or
      // action in the chain. In this case, it will continue with the ADD_ARTICLE action
      // if no bad words are present in the title.
      return next(action);
    };
  };
}

export function resetErrorMiddleware({ dispatch }) {
  return function (next) {
    return function (action) {
      console.log('Middleware resetErrorMiddleware intercepting...');

      if (action.type === ADD_ARTICLE) {
        dispatch(resetError());
      }
      return next(action);
    };
  };
}

// ----------------------------------------------------------------------------------

// Reducers
const initialState = {
  articles: [
    { id: 2, title: 'Title 2' },
    { id: 3, title: 'Title 3' },
    { id: 4, title: 'Title 4' },
  ],
  error: undefined,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
  case ADD_ARTICLE: {
    console.log('Dispatch action ADD_ARTICLE');
    const { title } = action.payload;
    let newArticle = {
      id: 0,
      title,
    };

    if (state.articles.length) {
      const id = [...state.articles].sort((a, b) => b.id - a.id)[0].id + 1;
      newArticle = {
        id,
        title,
      };
      return {
        ...state,
        articles: [...state.articles, newArticle],
      };
    }
    return {
      ...state,
      articles: [newArticle],
    };
  }
  case DELETE_ARTICLE: {
    const articleIdToDelete = action.payload;
    const filteredArticles = state.articles.filter(
      (article) => article.id !== articleIdToDelete,
    );
    return { ...state, articles: filteredArticles };
  }
  case HANDLE_ERROR: {
    console.log('Dispatch action HANDLE_ERROR');
    console.log(action.payload);
    const { type, message, stack } = action.payload;
    return {
      ...state,
      error: { type, message, stack },
    };
  }
  case RESET_ERROR: {
    console.log('Dispatch action RESET_ERROR');
    return {
      ...state,
      error: undefined,
    };
  }
  default:
    return state;
  }
}

// ----------------------------------------------------------------------------------

// Store
const store = createStore(
  rootReducer,
  // To wire up a middleware use applyMiddleware() from the redux library
  compose(
    applyMiddleware(resetErrorMiddleware),
    applyMiddleware(forbiddenWordsMiddleware),
  ),
);

export default store;
