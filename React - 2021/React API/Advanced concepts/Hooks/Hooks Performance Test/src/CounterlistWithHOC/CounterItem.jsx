/* eslint-disable react/prop-types */
import React from 'react';

const CounterItem = React.memo(({ data, handleIncrement }) => (
  <div className="counter-container">
    <h1>{data.id}</h1>
    <p>{data.count}</p>
    <button type="button" onClick={() => handleIncrement(data.id)}>ADD</button>
  </div>
), (prevProps, nextProps) => prevProps.data.count === nextProps.data.count);

export default CounterItem;
