/* eslint-disable react/prop-types */
import React from 'react';

import CounterItem from './CounterItem';

import '../styles/style.scss';

const CounterList = ({ counters, handleIncrement }) => {
  const counterList = counters.map((counter) => (
    <CounterItem
      key={counter.id}
      data={counter}
      handleIncrement={handleIncrement}
    />
  ));

  return (
    <div className="counter-list-container">
      {counterList}
    </div>
  );
};

export default CounterList;
