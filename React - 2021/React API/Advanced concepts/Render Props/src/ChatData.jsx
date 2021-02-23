import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [
        'Hello Sven',
        'How are you?',
      ],
    };
  }

  newMessage = (message) => {
    this.setState((state) => ({
      messages: [...state.messages, message],
    }));
  }

  render() {
    const { render } = this.props;

    return (
      <>
        {render({
          state: this.state,
          newMessage: this.newMessage,
        })}
      </>
    );
  }
}

ChatData.propTypes = {
  render: PropTypes.func.isRequired,
};

export default ChatData;
