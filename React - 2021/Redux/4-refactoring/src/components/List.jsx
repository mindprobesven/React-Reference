/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

// import { deleteArticle } from '../redux/store';

const List = ({ articles }) => {
  console.log('List');

  return (
    <div className="list">
      {
        articles.allIDs.map((id) => (
          <div key={id} className="list__item">
            <div className="list__text">
              <p>{articles.byID[id].title}</p>
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
  ({ articlesState: { articles } }) => ({ articles }),
  null,
)(List);
