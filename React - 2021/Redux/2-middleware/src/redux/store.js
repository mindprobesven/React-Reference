/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-multi-spaces */
/* eslint-disable func-names */
import { createStore, applyMiddleware, compose } from 'redux';

// ----------------------------------------------------------------------------------

// Constants
export const ARTICLE_ADD = 'ARTICLE_ADD';
export const ARTICLE_ADD_SUCCESS = 'ARTICLE_ADD_SUCCESS';
export const ARTICLE_ADD_FAILURE = 'ARTICLE_ADD_FAILURE';
export const ARTICLE_DELETE = 'ARTICLE_DELETE';

// ----------------------------------------------------------------------------------

// Actions
export function addArticle(formData) {
  return {
    type: ARTICLE_ADD,
    payload: { formData },
  };
}

export function addArticleSuccess(validatedFormData) {
  return {
    type: ARTICLE_ADD_SUCCESS,
    payload: { validatedFormData },
  };
}

export function addArticleFailure(error) {
  return {
    type: ARTICLE_ADD_FAILURE,
    payload: { error },
  };
}

export function deleteArticle({ id }) {
  return {
    type: ARTICLE_DELETE,
    payload: { id },
  };
}

// ----------------------------------------------------------------------------------

// Middleware
// A Redux middleware is a function that is able to intercept actions before they reach the reducer.
// In a middleware you can access getState and dispatch middlewareFunc({ getState, dispatch })

// This middleware only intercepts actions of type ARTICLE_ADD.
// ARTICLE_ADD is not processed in the reducer, in fact, it is not even in the reducer. Instead,
// ARTICLE_ADD is only processed when intercepted by this middleware.
// This middleware checks if action.payload.formData has a valid title
// and then dispatches a success or failure action.
export function formValidationMiddleware({ dispatch }) {
  return (next) => (action) => {
    console.log('Middleware formValidationMiddleware intercepting...');

    if (action.type === ARTICLE_ADD) {
      const forbiddenWords = ['spam', 'money'];
      const foundWord = forbiddenWords.filter(
        (word) => action.payload.formData.title.includes(word),
      );

      if (foundWord.length) {
        // A middleware can dispatch one more other other actions.
        // For example addArticleFailure can set some error message in the Redux store state.
        // A React component can then catch the error state and update it's UI (Show an error
        // message to the user).
        const error = {
          type: 'INVALID_TITLE',
          message: 'Found a bad word!',
        };

        dispatch(addArticleFailure(error));
      } else {
        dispatch(addArticleSuccess(action.payload.formData));
      }
    }

    // next(action) will move the application forward, either to the next middleware or
    // action in the chain.
    return next(action);
  };
}

// This middleware catches all actions. It checks if any action's action.payload contains
// an 'error' property. If so, it would mean some action resulted in an error.
// This middleware could be used as a centralized error handler for example.
export function errorLoggingMiddleware() {
  return (next) => (action) => {
    console.log('Middleware errorLoggingMiddleware intercepting...');

    if (Object.prototype.hasOwnProperty.call(action.payload, 'error')) {
      console.log('An error ocurred somewhere');
    }

    return next(action);
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
    actionResult: {
      status: 'idle',   // success, error or idle
      message: null,
      error: null,
    },
  },
};

function articlesReducer(state = initialState, action) {
  switch (action.type) {
  case ARTICLE_ADD_SUCCESS: {
    console.log('Dispatched action ARTICLE_ADD_SUCCESS');

    // Add the new article to the articles array
    const { title } = action.payload.validatedFormData;
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

    // Update the actionResult state
    newArticlesState.actionResult = {
      status: 'success',
      message: 'Successfully added the new article!',
      error: null,
    };

    return {
      ...state,
      articlesState: newArticlesState,
    };
  }
  case ARTICLE_ADD_FAILURE: {
    console.log('Dispatched action ARTICLE_ADD_FAILURE');

    const newArticlesState = { ...state.articlesState };

    // Update the actionResult state
    newArticlesState.actionResult = {
      status: 'error',
      message: action.payload.error.message,
      error: action.payload.error,
    };

    return {
      ...state,
      articlesState: newArticlesState,
    };
  }
  case ARTICLE_DELETE: {
    console.log('Dispatched action ARTICLE_DELETE');

    const { id } = action.payload;
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
  default:
    return state;
  }
}

// ----------------------------------------------------------------------------------

// Store
const store = createStore(
  articlesReducer,
  // To wire up a middleware use applyMiddleware() from the redux library
  compose(applyMiddleware(formValidationMiddleware, errorLoggingMiddleware)),
);

export default store;
