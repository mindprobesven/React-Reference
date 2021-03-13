import { useState } from 'react';

const useCounterData = () => {
  const [state, setState] = useState({
    counters: [
      { id: 1, count: 0 },
      { id: 2, count: 0 },
    ],
  });

  const handleIncrement = (id) => {
    setState((prevState) => {
      const counterIDs = prevState.counters.map((counter) => counter.id);
      const indexToUpdate = counterIDs.lastIndexOf(id);
      const counters = [...prevState.counters];

      counters[indexToUpdate] = {
        id, count: counters[indexToUpdate].count + 1,
      };

      return { counters };
    });
  };

  return [state.counters, handleIncrement];
};

export default useCounterData;
