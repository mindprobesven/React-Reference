import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import './style.css';

import UserList from './UserList';
import CounterList from './CounterList';
import ToggleButton from './ToggleButton';
import Warning from './Warning';

const users = [
  {
    id: 1, first: 'Sven', last: 'Kohn', age: 40,
  },
  {
    id: 2, first: 'Thomas', last: 'Kohn', age: 50,
  },
  {
    id: 3, first: 'Valentina', last: 'Kohn', age: 2,
  },
];

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="App">
        <Warning />
        <hr />
        <ToggleButton />
        <hr />
        <CounterList startValue={1} />
        <hr />
        <UserList users={users} />
      </div>
    );
  }
}

export default hot(App);
