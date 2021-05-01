/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addArticle } from '../redux/store';

const initialState = {
  title: '',
};

const Form = ({ _addArticle }) => {
  console.log('Form');
  const [state, setState] = useState(initialState);

  function handleChange(e) {
    setState({ title: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    _addArticle(state.title);
    setState(initialState);
  }

  return (
    <div className="form">
      <input
        className="form__input"
        type="text"
        placeholder="Enter article text"
        value={state.title}
        onChange={handleChange}
      />
      <button
        className="button"
        type="button"
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );
};

// Since this component doesn't require data from the Redux state (only actions),
// mapStateToProps is set to null.
export default connect(
  null,
  { _addArticle: addArticle },
)(Form);
