/* eslint-disable import/prefer-default-export */
import { UI_STATUS_STATE_UPDATE } from '../constants/ui';

function uiStatusStateUpdate(statusBar) {
  return {
    type: UI_STATUS_STATE_UPDATE,
    payload: { statusBar },
  };
}

export function uiStatusUpdate(result) {
  return (dispatch) => {
    console.log('Action: (uiStatusUpdate)');

    const {
      status,
      message,
      error,
    } = result;

    const statusBar = {
      isShowing: true,
      status,
      message,
      error,
    };

    dispatch(uiStatusStateUpdate(statusBar));
  };
}

export function uiStatusHide() {
  return (dispatch) => {
    console.log('Action: (uiStatusHide)');

    const statusBar = {
      isShowing: false,
      status: null,
      message: null,
      error: null,
    };

    dispatch(uiStatusStateUpdate(statusBar));
  };
}
