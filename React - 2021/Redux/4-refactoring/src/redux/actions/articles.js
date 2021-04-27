/* eslint-disable no-unused-vars */
import { ARTICLES_STATE_UPDATE } from '../constants/articles';

import { uiStatusUpdate } from './ui';

/*
- Is dispatched after an article action (add or delete) validated.
- Dispatches the uiStatusUpdate action with a validationResult object,
which triggers a UI state update to show a success or error notification in
the <Status> UI component.
*/
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

/*
- Is dispatched when the new article to be added passed validation
- Creates a newArticle object with unique ID.
- Creates an updatedArticles state update object, containing the data of
previous articles, plus the new one.
- Dispatches articlesStateUpdate action with the updatedArticles object, which is
then caught by the articlesReducer (ARTICLES_STATE_UPDATE) to update the state.
*/
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

/*
- Called by <Form> component to add a new article.
- Validates a new article's title for bad words.
- Creates a validationResult object.
- Dispatches articleValidationResult action with the validationResult object.
- The validationResult action dispatches a UI state update to show a success
or error notification in the <Status> UI component.
- If the validation passes, dispatches the articleAddSuccess action with the formData.
*/
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

/*
- Is dispatched when the article ID to be removed passed validation.
- Creates a new array (allIDs) with all article IDs, exluding the one to delete.
- Creates a new object (byID) containing all articles matching the IDs in allIDs.
- Creates an updatedArticles state update object, containing the data of previous
articles, minus the one removed.
- Dispatches articlesStateUpdate action with the updatedArticles object, which is
then caught by the articlesReducer (ARTICLES_STATE_UPDATE) to update the state.
*/
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

/*
- Called by <List> component to remove an article by ID.
- Validates the ID of the article to be removed (exists or not).
- Creates a validationResult object.
- Dispatches articleValidationResult action with the validationResult object.
- The validationResult action dispatches a UI state update to show a success
or error notification in the <Status> UI component.
- If the validation passes, dispatches the articleDeleteSuccess action with the ID value.
*/
export function deleteArticle(id) {
  return (dispatch, getState) => {
    console.log('Action: (deleteArticle)');

    let validationResult;

    const { articles } = getState().articlesState;

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
