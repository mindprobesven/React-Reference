import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import './style.css';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Hello, World! </h1>
      </div>
    );
  }
}

export default hot(App);
