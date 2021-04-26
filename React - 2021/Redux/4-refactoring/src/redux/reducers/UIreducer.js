import { UI_STATUS_UPDATE_SUCCESS } from '../constants/ui';

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
  },
};

export default function UIReducer(state = initialState, action) {
  switch (action.type) {
  case UI_STATUS_UPDATE_SUCCESS: {
    console.log('Dispatched action UI_STATUS_UPDATE_SUCCESS');

    console.log(action.payload);

    return state;
  }
  default:
    return state;
  }
}
