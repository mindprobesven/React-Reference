/* eslint-disable max-len */
/* eslint-disable no-unreachable */
import React, { Component } from 'react';

import './style.scss';

class BuggyClassComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    throw new Error('Error boundaries can catch errors during render, lifecycle methods and in the constructor.');
  }

  render() {
    return (
      <div className="container">
        <h1>Buggy Class Component</h1>
      </div>
    );
  }
}

export default BuggyClassComponent;
