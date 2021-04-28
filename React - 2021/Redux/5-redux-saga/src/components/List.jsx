/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

import { callApi } from '../redux/reducers/remoteDataReducer';

import Status from './Status';

const List = ({ categoryId, postsDataState, _callApi }) => {
  console.log('List');

  const posts = postsDataState[categoryId];
  console.log(posts);

  let sliceOfIDs = [];

  if (!posts) {
    console.log('Remote data does not exist!');
    _callApi(categoryId);
  } else {
    console.log('Remote data does exists!');
    console.log(posts.allIDs);
    sliceOfIDs = posts.allIDs.slice(0, 10);
    console.log(sliceOfIDs);
  }

  return (
    <div className="list">
      <Status validationType="delete" />
      {
        posts && sliceOfIDs.map((id) => (
          <div key={id} className="list__item">
            <div className="list__text">
              <p>{posts.byID[id].title}</p>
            </div>
            <button
              className="button"
              type="button"
            >
              Remove
            </button>
          </div>
        ))
      }
    </div>
  );
};

export default connect(
  ({ postsDataState }) => ({ postsDataState }),
  ({ _callApi: callApi }),
)(List);
