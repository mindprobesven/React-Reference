/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const Status = ({ statusBar }) => {
  const {
    isShowing,
    status,
    message,
    error,
  } = statusBar;

  useEffect(() => {
    console.log('<Status> mounted');
  }, []);

  if (!isShowing) {
    return null;
  }

  if (status === 'ERROR') {
    return (
      <div className="status status--red">
        <p>{`${error.name}: ${error.message}`}</p>
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
