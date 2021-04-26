/* eslint-disable no-unused-vars */
import { ARTICLES_STATE_UPDATE } from '../constants/articles';

import { uiStatusUpdate } from './ui';

function articleValidationResult(validationResult) {
  return (dispatch) => {
    console.log('Action: (articleValidationResult)');

    dispatch(uiStatusUpdate(validationResult));
  };
}

function articlesStateUpdate(byID, allIDs) {
  return {
    type: ARTICLES_STATE_UPDATE,
    payload: { byID, allIDs },
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

    dispatch(articlesStateUpdate(byID, allIDs));
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

    const allIDs = articles.allIDs.filter((articleID) => articleID !== id);

    const byID = {};

    allIDs.forEach((articleID) => {
      byID[articleID] = { ...articles.byID[articleID] };
    });

    dispatch(articlesStateUpdate(byID, allIDs));
  };
}

export function deleteArticle(id) {
  return (dispatch, getState) => {
    console.log('Action: (deleteArticle)');

    let validationResult;

    const { articles } = getState().articlesState;

    // Check if the article ID exists in the allIDs array
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
      dispatch(articleDeleteSuccess(id));
    }

    dispatch(articleValidationResult(validationResult));
  };
}
