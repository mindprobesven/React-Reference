/* eslint-disable import/prefer-default-export */
import { UPDATE_POSTS_DATA_STATE } from '../constants/posts';

function updatePostsDataState(category) {
  return { type: UPDATE_POSTS_DATA_STATE, payload: { category } };
}

export function postsUpdateFromRemoteData(categoryId) {
  return async (dispatch, getState) => {
    console.log('Action: (postsUpdateFromRemoteData)');

    const { remoteDataState } = getState();

    const remotePostsData = remoteDataState[categoryId];

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
