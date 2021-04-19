/* eslint-disable no-unused-vars */
// ----------------------------------------------------------------------------------
//
// Redux Thunk
//
// With the redux-thunk middleware, it is possible to return functions from action creators,
// exposing dispatch and getState. This makes it possible to have logic, as well as dispatch one or more
// actions directly from inside an action creator function, instead of having to create a custom middelware.
//
// ----------------------------------------------------------------------------------

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// ----------------------------------------------------------------------------------

// Constants
export const ARTICLE_ADD_SUCCESS = 'ARTICLE_ADD_SUCCESS';
export const ARTICLE_ADD_FAILURE = 'ARTICLE_ADD_FAILURE';
export const ARTICLE_DELETE = 'ARTICLE_DELETE';

export const UPDATE_ACTION_RESULT_STATE = 'UPDATE_ACTION_RESULT_STATE';

// ----------------------------------------------------------------------------------

// Standard action creators
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

// Action creator using redux-thunk middleware
//
// In 2-custom-middleware, we created a custom middleware function to catch actions of type ADD_ARTICLE
// to validated the article's title and then send either a success or error action.
// Instead of creating a custom middleware, another option is to use the redux-thunk middleware.
// A Redux action creator can only return an action object, but with redux-thunk, an action creator can
// return a function, exposing dispatch and getState! This makes it possible to have logic, as well as dispatch
// one more actions inside an action creator function. In most cases, it is possible to move the logic from a custom
// middleware function into an action creator using redux-thunk. Especially, when they have a very specific single-usage.
export function addArticle(formData) {
  return (dispatch, getState) => {
    console.log('Redux thunk middleware (addArticle) intercepting...');

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
  };
}

// ----------------------------------------------------------------------------------

// Middleware
export function actionResultMiddleware({ dispatch }) {
  return (next) => (action) => {
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
  // redux-thunk is wired up using the applyMiddleware()
  compose(applyMiddleware(actionResultMiddleware, thunk)),
);

export default store;
