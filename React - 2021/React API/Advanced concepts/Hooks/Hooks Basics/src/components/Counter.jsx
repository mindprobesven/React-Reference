/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

const Counter = React.memo(({ id, count, handleChange }) => {
  useEffect(() => {
    console.log('Counter Effect');
  }, [count]);

  return (
    <div className="counter-container">
      <p>{id}</p>
      <p>{`Clicked ${count}`}</p>
      <button type="button" onClick={(e) => handleChange(e, id)}>
        Click me
      </button>
    </div>
  );
}, (prevProps, nextProps) => prevProps.count === nextProps.count);

export default Counter;
