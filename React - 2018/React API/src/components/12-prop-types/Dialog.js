import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dialog extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.message}</h3>
        <p>{this.props.content}</p>
      </div>
    );
  }
}

Dialog.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

export default Dialog;