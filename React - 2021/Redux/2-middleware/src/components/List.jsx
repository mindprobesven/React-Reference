/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

import { deleteArticle } from '../redux/store';

const List = ({ articles, deleteArticle }) => {
  function handleRemove(articleID) {
    deleteArticle(articleID);
  }

  return (
    <div className="list">
      {
        articles.map((item) => (
          <div key={item.id} className="list__item">
            <div className="list__text">
              <p>{item.title}</p>
            </div>
            <button
              className="button"
              type="button"
              onClick={() => handleRemove(item.id)}
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
  ({ articles }) => ({ articles }),
  { deleteArticle },
)(List);
