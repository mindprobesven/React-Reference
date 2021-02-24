/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

export const UserContext = React.createContext({
  user: {},
});

UserContext.displayName = 'UserContext';

class UserStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: 'Sven',
        age: 40,
        title: 'Engineer',
      },
    };
  }

  render() {
    const { children } = this.props;

    return (
      <UserContext.Provider value={this.state}>
        {children}
      </UserContext.Provider>
    );
  }
}

export default UserStore;
