/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

const Counter = ({ articles }) => {
  console.log('Counter');

  return (
    <div className="counter">
      <h1 className="counter__text">{articles.length}</h1>
    </div>
  );
};

// This component only requires data from the Redux state, no actions.
// The mapDispatchToProps can be omitted from the 'connect' arguments.
export default connect(({ articles }) => ({ articles }))(Counter);
