import { UI_STATUS_UPDATE_SUCCESS } from '../constants/root';

const initialState = {
  ui: {
    components: {
      statusBar: {
        isShowing: false,
        status: undefined,
        message: undefined,
        error: undefined,
      },
    },
  },
};

export default function UIReducer(state = initialState, action) {
  switch (action.type) {
  case UI_STATUS_UPDATE_SUCCESS: {
    console.log('Dispatched action UI_STATUS_UPDATE_SUCCESS');
    return state;
  }
  default:
    return state;
  }
}
