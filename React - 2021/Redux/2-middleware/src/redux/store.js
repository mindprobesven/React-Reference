/* eslint-disable no-unused-vars */
/* eslint-disable no-multi-spaces */
/* eslint-disable func-names */
import { createStore, applyMiddleware, compose } from 'redux';

// ----------------------------------------------------------------------------------

// Constants
export const ARTICLE_ADD = 'ARTICLE_ADD';
export const ARTICLE_DELETE = 'ARTICLE_DELETE';
export const ARTICLE_RESULT = 'ARTICLE_RESULT';

// ----------------------------------------------------------------------------------

// Actions
export function addArticle({ title }) {
  return { type: ARTICLE_ADD, data: { title } };
}

export function deleteArticle({ id }) {
  return { type: ARTICLE_DELETE, data: { id } };
}

export function resultArticle({ data, error }) {
  return { type: ARTICLE_RESULT, data, error };
}

// ----------------------------------------------------------------------------------

// Middleware
// A Redux middleware is a function that is able to intercept actions before they reach the reducer.
// In a middleware you can access getState and dispatch middlewareFunc({ getState, dispatch })
export function forbiddenWordsMiddleware({ dispatch }) {
  return function (next) {
    return function (action) {
      console.log('Middleware forbiddenWordsMiddleware intercepting...');

      // This middleware only intercepts actions of type ARTICLE_ADD
      // It will check if bad words are in the title, then it will either
      // dispatch an error action or continue with the ARTICLE_ADD action.
      if (action.type === ARTICLE_ADD) {
        const forbiddenWords = ['spam', 'money'];
        const foundWord = forbiddenWords.filter(
          (word) => action.data.title.includes(word),
        );

        if (foundWord.length) {
          // The middleware can dispatch another action if necessary.
          // For example here the errorArticle() action gets dispatched.
          // The reducer will execute this action and update the Redux store state
          // with this new error data. A React component can then catch the error state
          // and update it's UI (Show an error message to the user).
          dispatch(resultArticle({
            data: null,
            error: {
              type: 'INVALID_TITLE',
              message: 'Found a bad word!',
              stack: ARTICLE_ADD,
            },
          }));
        } else {
          dispatch(resultArticle({
            data: action.data,
            error: null,
          }));
        }
      }
      // next(action) will move the application forward, either to the next middleware or
      // action in the chain. In this case, it will continue with the ARTICLE_ADD action
      // if no bad words are present in the title.
      return next(action);
    };
  };
}

export function errorLoggingMiddleware() {
  return function (next) {
    return function (action) {
      console.log('Middleware errorLoggingMiddleware intercepting...');

      if (action.error) {
        console.log('An error ocurred somewhere');
      }

      return next(action);
    };
  };
}

// ----------------------------------------------------------------------------------

// Reducers
const initialState = {
  articlesState: {
    data: {
      articles: [
        { id: 2, title: 'Title 2' },
        { id: 3, title: 'Title 3' },
        { id: 4, title: 'Title 4' },
      ],
    },
    result: {
      status: 'idle',   // success, error or idle
      data: null,
      error: null,
    },
  },
};

function articlesReducer(state = initialState, action) {
  switch (action.type) {
  case ARTICLE_ADD: {
    console.log('Dispatched action ARTICLE_ADD');

    const { title } = action.data;

    const forbiddenWords = ['spam', 'money'];
    const foundWord = forbiddenWords.filter(
      (word) => action.data.title.includes(word),
    );

    const newArticlesState = { ...state.articlesState };

    if (foundWord.length) {
      newArticlesState.result = {
        status: 'error',
        data: null,
        error: {
          type: 'INVALID_TITLE',
          message: 'Found a bad word!',
          stack: ARTICLE_ADD,
        },
      };
      return {
        ...state,
        articlesState: newArticlesState,
      };
    }

    const { articles } = state.articlesState.data;

    let newArticle = {
      id: 0,
      title,
    };

    if (articles.length) {
      const id = [...articles].sort((a, b) => b.id - a.id)[0].id + 1;
      newArticle = {
        id,
        title,
      };

      newArticlesState.data.articles = [...articles, newArticle];
    } else {
      newArticlesState.data.articles = [newArticle];
    }

    newArticlesState.result = {
      status: 'success',
      data: null,
      error: null,
    };

    return {
      ...state,
      articlesState: newArticlesState,
    };
  }
  case 'ARTICLE_ADD_OLD': {
    console.log('Dispatched action ARTICLE_ADD');

    const { error } = state.articlesState.result;

    if (error) {
      console.log('ARTICLE_ADD result = ERROR...Aborting!');
      return state;
    }

    const { title } = state.articlesState.result.data;
    let newArticle = {
      id: 0,
      title,
    };

    const newArticlesState = { ...state.articlesState };
    const { articles } = state.articlesState.data;

    if (articles.length) {
      const id = [...articles].sort((a, b) => b.id - a.id)[0].id + 1;
      newArticle = {
        id,
        title,
      };

      newArticlesState.data.articles = [...articles, newArticle];
    } else {
      newArticlesState.data.articles = [newArticle];
    }

    return {
      ...state,
      articlesState: newArticlesState,
    };
  }
  case ARTICLE_DELETE: {
    console.log('Dispatched action ARTICLE_DELETE');

    const { id } = action.data;
    const { articles } = state.articlesState.data;
    const filteredArticles = articles.filter(
      (article) => article.id !== id,
    );

    const newArticlesState = { ...state.articlesState };
    newArticlesState.data.articles = filteredArticles;

    return {
      ...state,
      articlesState: newArticlesState,
    };
  }
  case ARTICLE_RESULT: {
    console.log('Dispatched action ARTICLE_RESULT');

    const { data, error } = action;
    const newArticlesState = { ...state.articlesState };

    if (error) {
      newArticlesState.result = {
        status: 'error',
        data,
        error,
      };
    } else {
      newArticlesState.result = {
        status: 'success',
        data,
        error,
      };
    }

    return {
      ...state,
      articlesState: newArticlesState,
    };
  }
  default:
    return state;
  }
}

// ----------------------------------------------------------------------------------

// Store
const store = createStore(
  articlesReducer,
  // To wire up a middleware use applyMiddleware() from the redux library
  compose(
    // applyMiddleware(forbiddenWordsMiddleware),
    // applyMiddleware(errorLoggingMiddleware),
  ),
);

export default store;
