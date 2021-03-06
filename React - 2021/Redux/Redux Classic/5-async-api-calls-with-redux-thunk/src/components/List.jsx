/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { callApi } from '../redux/actions/remoteData';
import { uiStatusHide } from '../redux/actions/ui';

import Status from './Status';

const List = ({
  categoryId,
  postsDataState,
  _callApi,
  _uiStatusHide,
}) => {
  // categoryID is passed as a prop to <List> to initialize the first API call.
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);

  const posts = postsDataState[selectedCategoryId];

  // This useEffect first runs on mount. After, it runs only when the selectedCategoryId's state changes.
  // _callApi() only executes if the data of the selected category ID is not yet present in the Redux
  // postsDataState table. If the data is present (was fetched before), it is loaded from state and re-used.
  useEffect(() => {
    console.log('<List> selectedCategoryId changed');

    // Hide the <Status> component
    _uiStatusHide();

    if (typeof posts === 'undefined') {
      console.log('Data does not exist in postsDataState... calling API');
      _callApi(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  function getSliceOfIDs({ ids, from, to }) {
    return ids.slice(from, to);
  }

  function onSelectCategory(id) {
    setSelectedCategoryId(id);
  }

  return (
    <div className="list">
      <div className="list__item">
        <button
          className="button"
          type="button"
          onClick={() => onSelectCategory('posts')}
        >
          Posts (Default)
        </button>
        <button
          className="button"
          type="button"
          onClick={() => onSelectCategory('todos')}
        >
          Todos
        </button>
        <button
          className="button"
          type="button"
          onClick={() => onSelectCategory('articles')}
        >
          Articles (Cached)
        </button>
        <button
          className="button"
          type="button"
          onClick={() => onSelectCategory('nomatch')}
        >
          Computers (404)
        </button>
      </div>
      <Status />
      {
        !posts && (
          <div className="list__item">
            <div className="list__text">
              <p>Loading...</p>
            </div>
          </div>
        )
      }
      {
        posts && getSliceOfIDs({
          ids: posts.allIDs,
          from: 0,
          to: 10,
        }).map((id) => (
          <div key={id} className="list__item">
            <div className="list__text">
              <p>{posts.byID[id].title}</p>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default connect(
  ({ postsDataState }) => ({ postsDataState }),
  ({
    _callApi: callApi,
    _uiStatusHide: uiStatusHide,
  }),
)(List);
