import { useReducer, useCallback } from 'react';

const counterReducer = (state, action) => {
  switch (action.type) {
  case 'increment': {
    const counters = [...state.counters];

    const index = counters.findIndex(
      (counter) => counter.id === action.id,
    );

    counters[index] = {
      id: action.id, count: counters[index].count + 1,
    };

    return { counters };
  }
  default: {
    throw new Error(`Unhandled action type: ${action.type}`);
  }
  }
};

const initialState = {
  counters: [
    { id: 1, count: 0 },
    { id: 2, count: 0 },
  ],
};

const useCounterData = () => {
  const [state, dispatch] = useReducer(
    counterReducer,
    initialState,
  );

  const handleIncrement = useCallback((id) => {
    dispatch({
      type: 'increment',
      id,
    });
  }, []);

  return [state.counters, handleIncrement];
};

export default useCounterData;
