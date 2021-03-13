import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CounterData extends Component {
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
    const { render } = this.props;
    const { counters } = this.state;

    return (
      <>
        {render({
          counters,
          handleIncrement: this.handleIncrement,
        })}
      </>
    );
  }
}

CounterData.propTypes = {
  render: PropTypes.func.isRequired,
};

export default CounterData;
