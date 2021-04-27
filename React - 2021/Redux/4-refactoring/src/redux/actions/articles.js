/* eslint-disable no-unused-vars */
/*
----------------------------------------------------------------------------------

Actions - articles

- Updates the top-level state (uiState), defined in the rootReducer
- In this example, <Status> is the only React component connected to uiState. It
utilizes the state provided by uiState.components.statusBar to show a validation
success or error UI bar when an articles is added or removed.
- UIReducer sets its own initalState to pre-set the <Status> React component.

----------------------------------------------------------------------------------
*/

import { ARTICLES_STATE_UPDATE } from '../constants/articles';

import { uiStatusUpdate } from './ui';

function articleValidationResult(validationResult) {
  return (dispatch) => {
    console.log('Action: (articleValidationResult)');

    dispatch(uiStatusUpdate(validationResult));
  };
}

function articlesStateUpdate(updatedArticles) {
  return {
    type: ARTICLES_STATE_UPDATE,
    payload: { updatedArticles },
  };
}

// ----------------------------------------------------------------------

function articleAddSuccess(formData) {
  return (dispatch, getState) => {
    console.log('Action: (articleAddSuccess)');

    const { articles } = getState().articlesState;

    let newArticleID;

    if (articles.allIDs.length) {
      newArticleID = Math.max(...articles.allIDs) + 1;
    } else {
      newArticleID = 1;
    }

    const newArticle = {
      [newArticleID]: { title: formData.title },
    };

    const byID = { ...articles.byID, ...newArticle };
    const allIDs = [...articles.allIDs, newArticleID];

    const updatedArticles = { ...articles, byID, allIDs };

    dispatch(articlesStateUpdate(updatedArticles));
  };
}

export function addArticle(formData) {
  return (dispatch) => {
    console.log('Action: (addArticle)');

    let validationResult;

    const forbiddenWords = ['spam', 'money'];
    const foundWord = forbiddenWords.filter(
      (word) => formData.title.includes(word),
    );

    if (foundWord.length) {
      validationResult = {
        validation: 'ADD',
        status: 'ERROR',
        message: null,
        error: {
          type: 'INVALID_TITLE',
          message: 'Found a bad word!',
        },
      };
    } else {
      validationResult = {
        validation: 'ADD',
        status: 'SUCCESS',
        message: 'Successfully added the new article!',
        error: null,
      };
      dispatch(articleAddSuccess(formData));
    }

    dispatch(articleValidationResult(validationResult));
  };
}

// ----------------------------------------------------------------------

function articleDeleteSuccess(id) {
  return (dispatch, getState) => {
    console.log('Action: (articleDeleteSuccess)');

    const { articles } = getState().articlesState;

    // Create a new allIDs array with all article IDs, exluding the one to delete.
    const allIDs = articles.allIDs.filter((articleID) => articleID !== id);

    // Create a new articles byID object, only containing the articles in the new allIDs.
    const byID = {};
    allIDs.forEach((articleID) => {
      byID[articleID] = { ...articles.byID[articleID] };
    });

    const updatedArticles = { ...articles, byID, allIDs };

    dispatch(articlesStateUpdate(updatedArticles));
  };
}

export function deleteArticle(id) {
  return (dispatch, getState) => {
    console.log('Action: (deleteArticle)');

    let validationResult;

    const { articles } = getState().articlesState;

    // Validation - Checks if the article ID exists before it can be deleted.
    const exists = articles.allIDs.includes(id);

    if (!exists) {
      validationResult = {
        validation: 'DELETE',
        status: 'ERROR',
        message: null,
        error: {
          type: 'INVALID_ID',
          message: 'Article with ID not found!',
        },
      };
    } else {
      validationResult = {
        validation: 'DELETE',
        status: 'SUCCESS',
        message: 'Successfully deleted the article!',
        error: null,
      };
      // The ID exists. The article can be deleted. Dispatch articleDeleteSuccess.
      dispatch(articleDeleteSuccess(id));
    }

    // Dispatch articleValidationResult with the validation result data.
    // articleValidationResult will dispatch a UI state update to show a success
    // or error notification to the user.
    dispatch(articleValidationResult(validationResult));
  };
}
