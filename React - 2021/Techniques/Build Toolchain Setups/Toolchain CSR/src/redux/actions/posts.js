/* eslint-disable import/prefer-default-export */
// Reducer function actions
import { postsSetState } from '../slices/postsSlice';

export const postsLoadFromRemoteData = ({
  categoryId,
}) => (dispatch, getState) => {
  dispatch({ type: 'posts/postsLoadFromRemoteData' });

  const { remoteDataState } = getState();

  const remoteCategoryPosts = remoteDataState[categoryId];

  const postsData = {
    byID: {},
    allIDs: [],
  };

  remoteCategoryPosts.forEach((post) => {
    postsData.byID[post.id] = { title: post.title };
    postsData.allIDs = [...postsData.allIDs, post.id];
  });

  dispatch(postsSetState({ categoryId, postsData }));
};
