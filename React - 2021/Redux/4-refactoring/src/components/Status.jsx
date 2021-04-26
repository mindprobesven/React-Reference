/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const Status = ({ validationType, statusBar }) => {
  console.log('Status');
  console.log(JSON.stringify(statusBar));

  const {
    isShowing,
    status,
    message,
    error,
  } = statusBar[validationType];

  useEffect(() => {
    console.log('Status updated');
  });

  if (!isShowing) {
    return null;
  }

  if (status === 'ERROR') {
    return (
      <div className="status status--red">
        <p>{`Error: ${error.type} - ${error.message}`}</p>
      </div>
    );
  }
  if (status === 'SUCCESS') {
    return (
      <div className="status status--green">
        <p>{message}</p>
      </div>
    );
  }
  return null;
};

export default connect(
  ({ uiState: { components: { statusBar } } }) => ({ statusBar }),
)(Status);
