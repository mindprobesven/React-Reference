/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';

// Reducer function actions
import { postsSetState } from '../slices/postsSlice';

export const postsLoadFromRemoteData = createAsyncThunk(
  'posts/postsLoadFromRemoteData',
  ({ categoryId }, { dispatch, getState }) => {
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
  },
);
