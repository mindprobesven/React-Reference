import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CounterItem from './CounterItem';

class CounterList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: props.startValue,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    console.log(`===> ${this.constructor.name} will unmount`);

    clearInterval(this.timerID);
  }

  tick() {
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
    }));
  }

  render() {
    const { counter } = this.state;

    return (
      <div>
        <h1>Counter List</h1>
        <CounterItem counterID={1} intervalAt={1} count={counter} />
        <CounterItem counterID={2} intervalAt={2} count={counter} />
        <CounterItem counterID={3} intervalAt={4} count={counter} />
      </div>
    );
  }
}

CounterList.propTypes = {
  startValue: PropTypes.number.isRequired,
};

export default CounterList;
