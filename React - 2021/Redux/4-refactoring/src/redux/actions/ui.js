/* eslint-disable import/prefer-default-export */

import { UI_STATUS_UPDATE_SUCCESS } from '../constants/ui';

/* eslint-disable no-unused-vars */
export function uiStatusUpdate(validationResult) {
  return (dispatch) => {
    console.log('Action: (uiStatusUpdate)');
    console.log(validationResult);

    const {
      validation,
      status,
      message,
      error,
    } = validationResult;

    const newStatusBar = {
      add: {
        isShowing: false,
        status: null,
        message: null,
        error: null,
      },
      delete: {
        isShowing: false,
        status: null,
        message: null,
        error: null,
      },
    };

    if (validation === 'ADD') {
      newStatusBar.add = {
        isShowing: true,
        status,
        message,
        error,
      };
    }

    if (validation === 'DELETE') {
      newStatusBar.delete = {
        isShowing: true,
        status,
        message,
        error,
      };
    }

    dispatch({
      type: UI_STATUS_UPDATE_SUCCESS,
      payload: { newStatusBar },
    });
  };
}
