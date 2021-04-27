/* eslint-disable import/prefer-default-export */
import { UI_STATUS_STATE_UPDATE } from '../constants/ui';

function uiStatusStateUpdate(statusBar) {
  return {
    type: UI_STATUS_STATE_UPDATE,
    payload: { statusBar },
  };
}

/*
- Is dispatched after the actions (article add and delete) are validated.
- Creates a statusBar state update object using the data from the validationResult object.
- Dispatches uiStatusStateUpdate action with the statusBar object, which is
then caught by the UIReducer (UI_STATUS_STATE_UPDATE) to update the state.
- The statusBar state is connected to the <Status> UI component to show a success
or error notification to the user.
*/
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
