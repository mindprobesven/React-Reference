/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';

const withDataSource = (WrappedComponent) => {
  class WithDataSource extends Component {
    constructor(props) {
      super(props);

      this.state = {
        counters: [
          { id: 1, count: 0 },
          { id: 2, count: 0 },
        ],
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
      const { counters } = this.state;

      return (
        <WrappedComponent
          counters={counters}
          handleIncrement={this.handleIncrement}
          {...this.props}
        />
      );
    }
  }

  WithDataSource.displayName = `WithDataSource(${WrappedComponent.name})`;
  return WithDataSource;
};

export default withDataSource;
