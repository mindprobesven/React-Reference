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
    const { title } = state;
    e.preventDefault();
    // The Redux middleware forbiddenWordsMiddleware() will intercept the addArticle() action.
    // The middleware will check if bad words are present in the title ('spam', 'money', etc.).
    // If not, then it will dispatch addArticle() action.
    // If bad words are found, the middleware will dispatch the handleError() action, it will update
    // the 'error' property in the Redux store state with the current error. This Redux state updated
    // can then be detected by some React component that hows an error UI.
    _addArticle({ title });
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

export default connect(
  null,
  { _addArticle: addArticle },
)(Form);
