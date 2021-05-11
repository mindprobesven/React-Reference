/* eslint-disable react/prop-types */
import React, { useEffect, memo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

const selectorFunction = (state) => state.uiState.components.statusBar;

const Status = memo(() => {
  const statusBar = useSelector(selectorFunction, shallowEqual);

  const {
    isShowing,
    status,
    message,
    error,
  } = statusBar;

  useEffect(() => {
    console.log('<Status> mounted');
  }, []);

  useEffect(() => {
    console.log('<Status> rendered -------------------------------->');
  });

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
});

export default Status;
