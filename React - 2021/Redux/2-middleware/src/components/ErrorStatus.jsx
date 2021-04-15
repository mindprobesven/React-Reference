/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

const ErrorStatus = ({ error }) => {
  console.log('ErrorStatus');
  console.log(error);

  if (error) {
    return (
      <div className="single-column">
        <div className="error-status">
          <p>{`Error: ${error.type} - ${error.message} - at ${error.stack}`}</p>
        </div>
      </div>
    );
  }
  return null;
};

export default connect(
  ({ error }) => ({ error }),
)(ErrorStatus);
