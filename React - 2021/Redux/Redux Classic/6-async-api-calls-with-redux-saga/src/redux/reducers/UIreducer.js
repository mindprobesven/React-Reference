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
