import React, { useState } from 'react';

const initialState = {
  title: '',
};

const Form = () => {
  console.log('Form');
  const [state, setState] = useState(initialState);

  function handleChange(e) {
    setState({ title: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setState({ title: '' });
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

export default Form;
