/*
----------------------------------------------------------------------------------

UIReducer

- Updates the top-level state object (uiState), defined in the rootReducer with;

components: {
    statusBar: {
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
    },
    someBox: {
      title: 'Foo',
    },
  },

- Updates the UI state to show a success or error notification in
the <Status> UI component.
- In this example, <Status> is the only React component connected to uiState. It
utilizes the state provided by uiState.components.statusBar to show a validation
success or error UI bar when an articles is added or removed.
- UIReducer receives its own initalState to pre-set the <Status> React component
connected to components.statusBar

----------------------------------------------------------------------------------
*/

import { UI_STATUS_STATE_UPDATE } from '../constants/ui';

const initialState = {
  components: {
    statusBar: {
      isShowing: false,
      status: null,
      message: null,
      error: null,
    },
  },
};

export default function UIReducer(state = initialState, action) {
  switch (action.type) {
  case UI_STATUS_STATE_UPDATE: {
    console.log('UIReducer: (UI_STATUS_STATE_UPDATE)');

    const { statusBar } = action.payload;
    const updatedComponents = { ...state.components, statusBar };
    return { ...state, components: updatedComponents };
  }
  default:
    return state;
  }
}
