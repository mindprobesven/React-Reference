/*
----------------------------------------------------------------------------------

UIReducer

- Updates the top-level state (uiState), defined in the rootReducer
- In this example, <Status> is the only React component connected to uiState. It
utilizes the state provided by uiState.components.statusBar to show a validation
success or error UI bar when an articles is added or removed.
- UIReducer sets its own initalState to pre-set the <Status> React component.

----------------------------------------------------------------------------------
*/

import { UI_STATUS_STATE_UPDATE } from '../constants/ui';

// UIReducer receives its own initalState to pre-set the <Status> React component
// connected to components.statusBar
const initialState = {
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
};

export default function UIReducer(state = initialState, action) {
  switch (action.type) {
  // This action receives an already prepared and updated 'statusBar'
  // state object in its payload to keep the reducer lean and fast.
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
