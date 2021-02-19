/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import withDataSource from './withDataSource';

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { data } = this.props;

    return (
      <div className="counter">
        <h1>Counter</h1>
        <p>{data}</p>
      </div>
    );
  }
}

export default withDataSource(Counter);
