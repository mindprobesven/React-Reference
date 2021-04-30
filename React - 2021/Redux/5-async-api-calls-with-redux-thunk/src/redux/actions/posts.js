/* eslint-disable import/prefer-default-export */
import { UPDATE_POSTS_DATA_STATE } from '../constants/posts';

function updatePostsDataState(category) {
  return { type: UPDATE_POSTS_DATA_STATE, payload: { category } };
}

/*
- This action retrieves the posts data by category ID from the remoteDataState.
Then it transforms the data to match a normalized state shape and stores it in
postsDataState. The postsDataState is the final prepared data used by the
<List> component.
*/
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
