/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

import { deleteArticle } from '../redux/actions/articles';

import Status from './Status';

const List = ({ articles, _deleteArticle }) => {
  console.log('List');

  function handleRemove(id) {
    _deleteArticle(id);
  }

  return (
    <div className="list">
      <Status validationType="delete" />
      {
        articles.allIDs.map((id) => (
          <div key={id} className="list__item">
            <div className="list__text">
              <p>{articles.byID[id].title}</p>
            </div>
            <button
              className="button"
              type="button"
              onClick={() => handleRemove(id)}
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
  ({ articlesState: { articles } }) => ({ articles }),
  { _deleteArticle: deleteArticle },
)(List);
