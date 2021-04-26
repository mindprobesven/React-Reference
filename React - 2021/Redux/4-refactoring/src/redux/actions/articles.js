/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { ARTICLE_ADD_SUCCESS } from '../constants/articles';
import { uiStatusUpdate } from './ui';

function articleAddSuccess(formData) {
  return (dispatch, getState) => {
    console.log('Action: (articleAddSuccess)');

    const { articles } = getState().articlesState;

    const newArticleID = Math.max(...articles.allIDs) + 1;
    const newArticle = {
      [newArticleID]: { title: formData.title },
    };

    dispatch({
      type: ARTICLE_ADD_SUCCESS,
      payload: { newArticleID, newArticle },
    });
  };
}

function articleValidationResult(validationResult) {
  return (dispatch) => {
    console.log('Action: (articleValidationResult)');

    dispatch(uiStatusUpdate(validationResult));
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
