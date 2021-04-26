/* eslint-disable import/prefer-default-export */
import { UI_STATUS_STATE_UPDATE } from '../constants/ui';

function uiStatusStateUpdate(statusBar) {
  return {
    type: UI_STATUS_STATE_UPDATE,
    payload: { statusBar },
  };
}

export function uiStatusUpdate(validationResult) {
  return (dispatch) => {
    console.log('Action: (uiStatusUpdate)');

    const {
      validation,
      status,
      message,
      error,
    } = validationResult;

    const statusBar = {
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
      statusBar.add = {
        isShowing: true,
        status,
        message,
        error,
      };
    }

    if (validation === 'DELETE') {
      statusBar.delete = {
        isShowing: true,
        status,
        message,
        error,
      };
    }

    dispatch(uiStatusStateUpdate(statusBar));
  };
}
