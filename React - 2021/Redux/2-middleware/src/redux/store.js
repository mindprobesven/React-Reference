// ----------------------------------------------------------------------------------
//
// Redux Middleware
//
// In this example, two custom Redux middleware functions are used.
//
// - formValidationMiddleware() catches actions of type ARTICLE_ADD. It checks if the
// new article's title contains bad words. If not, the middleware dispatches the action
// ARTICLE_ADD_SUCCESS, which adds the new article to the Redux store state (articlesState).
// If yes, it dispatches the action ARTICLE_ADD_FAILURE
//
// - actionResultMiddleware() catches all actions that contain an action.actionResult object.
// Both the ARTICLE_ADD_SUCCESS and ARTICLE_ADD_FAILURE actions contain these. The actionResult object
// describes if an action was a success or resulted in an error. The middleware dispatches
// UPDATE_ACTION_RESULT_STATE which updates the Redux store state (actionResultState) with the
// new actionResult object. actionResultState can be used to update a React component UI to show the user
// an error or success message.
// ----------------------------------------------------------------------------------

import { createStore, applyMiddleware, compose } from 'redux';

// ----------------------------------------------------------------------------------

// Constants
export const ARTICLE_ADD = 'ARTICLE_ADD';
export const ARTICLE_ADD_SUCCESS = 'ARTICLE_ADD_SUCCESS';
export const ARTICLE_ADD_FAILURE = 'ARTICLE_ADD_FAILURE';
export const ARTICLE_DELETE = 'ARTICLE_DELETE';

export const UPDATE_ACTION_RESULT_STATE = 'UPDATE_ACTION_RESULT_STATE';

// ----------------------------------------------------------------------------------

// Actions
export function addArticle(formData) {
  return {
    type: ARTICLE_ADD,
    payload: { formData },
  };
}

export function addArticleSuccess(validatedFormData, actionResult) {
  return {
    type: ARTICLE_ADD_SUCCESS,
    payload: { validatedFormData },
    actionResult,
  };
}

export function addArticleFailure(actionResult) {
  return {
    type: ARTICLE_ADD_FAILURE,
    actionResult,
  };
}

export function deleteArticle(id) {
  return {
    type: ARTICLE_DELETE,
    payload: { id },
  };
}

export function updateActionResultState(actionResultState) {
  return {
    type: UPDATE_ACTION_RESULT_STATE,
    actionResultState,
  };
}

// ----------------------------------------------------------------------------------

// Middleware
// A Redux middleware is a function that is able to intercept actions before they reach the reducer.
// In a middleware you can access getState and dispatch middlewareFunc({ getState, dispatch })
// A middleware can dispatch one more other other actions.

export function formValidationMiddleware({ dispatch }) {
  return (next) => (action) => {
    // Catch actions of type ARTICLE_ADD
    if (action.type === ARTICLE_ADD) {
      console.log('Middleware formValidationMiddleware intercepting...');

      const { formData } = action.payload;
      let actionResult;

      const forbiddenWords = ['spam', 'money'];
      const foundWord = forbiddenWords.filter(
        (word) => formData.title.includes(word),
      );

      if (foundWord.length) {
        actionResult = {
          status: 'error',
          message: null,
          error: {
            type: 'INVALID_TITLE',
            message: 'Found a bad word!',
          },
        };

        dispatch(addArticleFailure(actionResult));
      } else {
        actionResult = {
          status: 'success',
          message: 'Successfully added the new article!',
          error: null,
        };

        dispatch(addArticleSuccess(formData, actionResult));
      }
    }

    // next(action) will move the application forward, either to the next middleware or
    // action in the chain.
    return next(action);
  };
}

export function actionResultMiddleware({ dispatch }) {
  return (next) => (action) => {
    // If action.actionResult is undefined, move forward to the next middleware or action
    if (!action.actionResult) {
      return next(action);
    }

    console.log('Middleware actionResultMiddleware intercepting...');
    console.log(action.actionResult);

    const { status } = action.actionResult;

    if (status === 'success' || status === 'error') {
      dispatch(updateActionResultState(action.actionResult));
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
  },
  actionResultState: {
    // success, error or idle
    status: 'idle',
    message: null,
    error: null,
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
  case UPDATE_ACTION_RESULT_STATE: {
    console.log('Dispatched action UPDATE_ACTION_RESULT_STATE');

    const { actionResultState } = action;

    return {
      ...state,
      actionResultState,
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
  compose(applyMiddleware(formValidationMiddleware, actionResultMiddleware)),
);

export default store;
