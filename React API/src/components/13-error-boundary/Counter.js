import React, { Component } from 'react';
import './Counter.scss';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  increaseCounter = () => {
    this.setState(prevState => ({
      value: prevState.value + 1
    }));
  }

  render() {
    const value = this.state.value;

    if(value >= 3) {
      throw new Error('Simulated Error');
    }

    return (
      <div className="Counter">
        <h1>{value}</h1>
        <button onClick={this.increaseCounter}>Next</button>
      </div>
    );
  }
}

export default Counter;