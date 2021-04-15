/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

import { deleteArticle } from '../redux/store';

const List = ({ articles, deleteArticle }) => {
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

/* ------------------------------------------------------------------------
The 'connect' method from the react-redux library connects a React component
with the Redux store. 'connect' requires a 'Provider' wrapper HOC from react-redux.

The 'connect' method is used with two arguments:

1. A mapStateToProps function
Connects part of the Redux state to the props of a component.

2. A mapDispatchToProps function
Connects Redux actions to the props of a component.
------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------
Verbose form

const mapStateToProps = (state) => (
  { articles: state.articles },
);

const mapDispatchToProps = (dispatch) => (
  { _deleteArticle: (articleID) => dispatch(deleteArticle(articleID)) }
);

const List = connect(mapStateToProps, { deleteArticle })(List);
------------------------------------------------------------------------ */

// Shorthand form
export default connect(
  ({ articles }) => ({ articles }),
  { deleteArticle },
)(List);
