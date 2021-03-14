/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React, { Component } from 'react';

export const CounterContext = React.createContext();

CounterContext.displayName = 'CounterContext';

class CounterStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counters: [
        { id: 1, count: 0 },
        { id: 2, count: 0 },
      ],
      handleIncrement: this.handleIncrement,
    };
  }

  handleIncrement = (id) => {
    const { counters } = this.state;

    const counterIDs = counters.map((counter) => counter.id);
    const updateIndex = counterIDs.lastIndexOf(id);
    const updatedCounters = [...counters];

    updatedCounters[updateIndex] = {
      id, count: updatedCounters[updateIndex].count + 1,
    };

    this.setState({
      counters: updatedCounters,
    });
  }

  render() {
    const { children } = this.props;

    return (
      <CounterContext.Provider value={this.state}>
        {children}
      </CounterContext.Provider>
    );
  }
}

export default CounterStore;
