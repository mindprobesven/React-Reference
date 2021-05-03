/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';

import { UI_STATUS_STATE_UPDATE } from '../constants/ui';

function uiStatusStateUpdate(statusBar) {
  return {
    type: UI_STATUS_STATE_UPDATE,
    payload: { statusBar },
  };
}

export const uiStatusUpdate = createAsyncThunk(
  'ui/uiStatusUpdate',
  ({ response = null, error = null, fromCache = false }, { dispatch }) => {
    console.log('Action: (ui/uiStatusUpdate)');

    const statusBar = {
      isShowing: true,
      status: null,
      message: null,
      error: null,
    };

    if (error) {
      if (error.response) {
        statusBar.status = 'ERROR';
        statusBar.error = {
          name: 'Request Error',
          message: `${error.response.status} - ${error.message}`,
        };
      } else if (error.request) {
        statusBar.status = 'ERROR';
        statusBar.error = {
          name: 'Network Error',
          message: 'The server does not respond!',
        };
      } else {
        statusBar.status = 'ERROR';
        statusBar.error = {
          name: error.name,
          message: error.message,
        };
      }
    }

    if (response) {
      statusBar.status = 'SUCCESS';
      statusBar.message = `Server response: ${response.status} OK`;
    }

    if (fromCache) {
      statusBar.status = 'SUCCESS';
      statusBar.message = 'Category data loaded from cache';
    }

    dispatch(uiStatusStateUpdate(statusBar));
  },
);

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
