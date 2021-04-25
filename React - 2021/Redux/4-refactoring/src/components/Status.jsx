/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const Status = ({ status, message, error }) => {
  console.log('Status');

  useEffect(() => {
    console.log('Status updated');
  });

  if (status === 'error') {
    return (
      <div className="status status--red">
        <p>{`Error: ${error.type} - ${error.message}`}</p>
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
    actionResultState: { status, message, error },
  }) => ({ status, message, error }),
)(Status);
