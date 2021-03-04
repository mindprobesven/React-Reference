/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useRef } from 'react';

import './style.scss';
import Counter from './Counter';

const CounterList = () => {
  const [state, setState] = useState({
    counter1: 0,
    counter2: 0,
  });

  const prevStateRef = useRef();

  useEffect(() => {
    console.log('Effect');
    prevStateRef.current = state;
  }, [state]);

  const handleChange = React.useCallback((e, id) => {
    setState((prevState) => ({ ...prevState, [id]: prevState[id] + 1 }));
  }, []);

  const createCounterList = () => (
    Object.entries(state).map(([counterID, count]) => (
      <Counter
        key={counterID}
        id={counterID}
        count={count}
        handleChange={handleChange}
      />
    )));

  console.log(state);
  console.log(prevStateRef.current);

  return (
    <div className="container">
      {createCounterList()}
    </div>
  );
};

export default CounterList;
