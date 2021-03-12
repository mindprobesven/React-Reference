/* eslint-disable no-unreachable */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import withDataSource from './withDataSource';

class CounterBox extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      counterID, data, handleReset, handleStop,
    } = this.props;

    return (
      <div className="counter-container">
        <h1>{counterID}</h1>
        <p>{data}</p>
        <button type="button" onClick={handleReset}>RESET</button>
        <button type="button" onClick={handleStop}>STOP</button>
      </div>
    );
  }
}

export default withDataSource(CounterBox);
