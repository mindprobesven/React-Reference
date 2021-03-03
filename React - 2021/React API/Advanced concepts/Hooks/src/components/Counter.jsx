/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';

import './style.scss';

const Counter = () => {
  // useState is a Hook, it returns a pair. The current state value and a function to update it.
  // This funcion can be called from an event handler or somewhere else.
  // It is similar to this.setState in a class, but doesn't merge the old and new state totgether.
  // The 0 in useState is the only argument and sets the initial state. It can be an object, array, etc.
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <p>You clicked {count} times</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
};

export default Counter;
