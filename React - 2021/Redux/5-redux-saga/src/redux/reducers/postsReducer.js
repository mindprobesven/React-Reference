/* eslint-disable no-unused-vars */
const UPDATE_POSTS_DATA_STATE = 'UPDATE_POSTS_DATA_STATE';

function updatePostsDataState(category) {
  return { type: 'UPDATE_POSTS_DATA_STATE', payload: { category } };
}

export function postsUpdateFromRemoteData(categoryId) {
  return async (dispatch, getState) => {
    console.log('Action: (postsUpdateFromRemoteData)');

    const { remoteDataState } = getState();

    const remotePostsData = remoteDataState[categoryId];

    // The API response remote data is transformed to match a normalized state shape
    const category = {
      [categoryId]: {
        byID: {},
        allIDs: [],
      },
    };

    remotePostsData.forEach((post) => {
      category[categoryId].byID[post.id] = { title: post.title };
      category[categoryId].allIDs = [...category[categoryId].allIDs, post.id];
    });

    dispatch(updatePostsDataState(category));
  };
}

export default function postsReducer(state = {}, action) {
  switch (action.type) {
  case 'UPDATE_POSTS_DATA_STATE': {
    console.log('postsReducer: (UPDATE_POSTS_DATA_STATE)');

    const { category } = action.payload;
    return { ...state, ...category };
  }
  default:
    return state;
  }
}
