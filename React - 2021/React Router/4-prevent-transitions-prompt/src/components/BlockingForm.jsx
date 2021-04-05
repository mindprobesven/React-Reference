/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Prompt } from 'react-router-dom';

const initialState = {
  first: '',
  last: '',
};

const BlockingForm = () => {
  const [isBlocking, setIsBlocking] = useState(false);
  const [formFields, setFormFields] = useState(initialState);

  useEffect(() => {
    const fieldLengths = Object.values(formFields).map((field) => field.length);
    const formIsNotEmpty = fieldLengths.some((fieldLength) => fieldLength > 0);
    setIsBlocking(formIsNotEmpty);
  }, [formFields]);

  function handleChange(e) {
    setFormFields((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formFields);
    setFormFields(initialState);
  }

  return (
    <div>
      {/* Used to prompt the user before navigating away from a page.
      When your application enters a state that should prevent the user
      from navigating away (like a form is half-filled out), render a
      <Prompt>. */}
      <Prompt
        when={isBlocking}
        message={
          (location) => `Are you sure you want to go to ${location.pathname}?`
        }
      />
      <h1>Form</h1>
      <p>{`isBlocking: ${isBlocking}`}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first"
          placeholder="First name"
          value={formFields.first}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="last"
          placeholder="Last name"
          value={formFields.last}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BlockingForm;
