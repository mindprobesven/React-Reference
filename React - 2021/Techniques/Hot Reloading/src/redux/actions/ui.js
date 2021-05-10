/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';

// Reducer function actions
import { uiStatusSetState } from '../slices/uiSlice';

export const uiStatusUpdate = createAsyncThunk(
  'ui/uiStatusUpdate',
  ({ response = null, error = null, fromCache = false }, { dispatch }) => {
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

    dispatch(uiStatusSetState({ statusBar }));
  },
);

export const uiStatusHide = createAsyncThunk(
  'ui/uiStatusHide',
  (args, { dispatch }) => {
    const statusBar = {
      isShowing: false,
      status: null,
      message: null,
      error: null,
    };

    dispatch(uiStatusSetState({ statusBar }));
  },
);
