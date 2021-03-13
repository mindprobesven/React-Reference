import React from 'react';

import useCounterData from './useCounterData';
import CounterItem from './CounterItem';

import './style.scss';

const CounterListHooks = () => {
  const [counters, handleIncrement] = useCounterData();

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

export default CounterListHooks;
