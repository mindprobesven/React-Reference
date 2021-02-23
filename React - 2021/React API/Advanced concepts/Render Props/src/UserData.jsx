import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Sven',
      age: 40,
      title: 'Engineer',
    };
  }

  render() {
    const { render } = this.props;

    return (
      <>
        {render(this.state)}
      </>
    );
  }
}

UserData.propTypes = {
  render: PropTypes.func.isRequired,
};

export default UserData;
