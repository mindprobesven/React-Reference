import { UI_STATUS_STATE_UPDATE } from '../constants/ui';

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
      title: 'BLAAAA',
    },
  },
};

export default function UIReducer(state = initialState, action) {
  switch (action.type) {
  case UI_STATUS_STATE_UPDATE: {
    console.log('UIReducer: (UI_STATUS_STATE_UPDATE)');

    const { statusBar } = action.payload;
    const components = { ...state.components, statusBar };
    return { ...state, components };
  }
  default:
    return state;
  }
}
