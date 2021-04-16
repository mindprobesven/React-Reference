/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

const Status = ({ status, error }) => {
  console.log('Status');

  if (status === 'error') {
    return (
      <div className="status status--red">
        <p>{`Error: ${error.type} - ${error.message} - at ${error.stack}`}</p>
      </div>
    );
  }
  if (status === 'success') {
    return (
      <div className="status status--green">
        <p>Successfully added the new article!</p>
      </div>
    );
  }
  return null;
};

export default connect(
  ({ articlesState: { result: { status, error } } }) => ({ status, error }),
)(Status);
