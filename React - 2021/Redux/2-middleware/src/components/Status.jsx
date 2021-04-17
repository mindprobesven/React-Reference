/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

const Status = ({ status, message, error }) => {
  console.log('Status');

  if (status === 'error') {
    return (
      <div className="status status--red">
        <p>{`Error: ${error.type} - ${message}`}</p>
      </div>
    );
  }
  if (status === 'success') {
    return (
      <div className="status status--green">
        <p>{message}</p>
      </div>
    );
  }
  return null;
};

export default connect(
  ({
    articlesState: {
      actionResult: { status, message, error },
    },
  }) => ({ status, message, error }),
)(Status);
