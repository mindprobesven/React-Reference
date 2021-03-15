/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

import useCounterData from './useCounterData';
import CounterItem from '../components/CounterItem';

import '../styles/style.scss';

const CounterListWithReducer = () => {
  const [counters, handleIncrement] = useCounterData();

  useEffect(() => {
    const counterText = counters.map(
      (counter) => `Counter ID: ${counter.id} [${counter.count}]`,
    ).join(' - ');
    document.title = counterText;
  }, [counters]);

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

export default CounterListWithReducer;
