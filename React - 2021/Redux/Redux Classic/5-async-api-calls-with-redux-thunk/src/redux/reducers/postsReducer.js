const UPDATE_POSTS_DATA_STATE = 'UPDATE_POSTS_DATA_STATE';

export default function postsReducer(state = {}, action) {
  switch (action.type) {
  case UPDATE_POSTS_DATA_STATE: {
    console.log('postsReducer: (UPDATE_POSTS_DATA_STATE)');

    const { category } = action.payload;
    return { ...state, ...category };
  }
  default:
    return state;
  }
}
