import React, { useContext } from 'react';

import { CounterContext } from '../contexts/CounterStore';
import CounterItem from '../components/CounterItem';

import '../styles/style.scss';

const CounterListHooksContext = () => {
  const { counters, handleIncrement } = useContext(CounterContext);

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

export default CounterListHooksContext;
