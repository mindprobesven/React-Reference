/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

import { deleteArticle } from '../redux/store';

const ConnectedList = ({ articles, deleteArticle }) => {
  console.log('List');

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

/*
Long form

const mapStateToProps = (state) => ({ articles: state.articles });

const mapDispatchToProps = (dispatch) => (
  { _deleteArticle: (articleID) => dispatch(deleteArticle(articleID)) }
);

const List = connect(mapStateToProps, { deleteArticle })(ConnectedList);
*/

// Shorthand form
const List = connect(
  ({ articles }) => ({ articles }),
  { deleteArticle },
)(ConnectedList);

export default List;
