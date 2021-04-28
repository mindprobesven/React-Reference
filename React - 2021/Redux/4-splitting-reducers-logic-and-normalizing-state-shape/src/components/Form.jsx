/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addArticle } from '../redux/actions/articles';

import Status from './Status';

const initialState = {
  title: '',
};

const Form = ({ _addArticle }) => {
  const [state, setState] = useState(initialState);

  function handleChange(e) {
    setState({ title: e.target.value });
  }

  function handleSubmit(e) {
    const { title } = state;
    e.preventDefault();
    if (title.length) {
      _addArticle({ title });
      setState(initialState);
    }
  }

  return (
    <>
      <Status validationType="add" />
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
    </>
  );
};

export default connect(
  null,
  { _addArticle: addArticle },
)(Form);
