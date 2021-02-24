/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

export const ChatContext = React.createContext({
  messages: [],
  newMessage: () => {},
});

ChatContext.displayName = 'ChatContext';

class ChatStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [
        'Hello Sven',
        'How are you?',
      ],
      newMessage: this.newMessage,
    };
  }

  newMessage = (message) => {
    this.setState((state) => ({
      messages: [...state.messages, message],
    }));
  }

  render() {
    const { children } = this.props;

    return (
      <ChatContext.Provider value={this.state}>
        {children}
      </ChatContext.Provider>
    );
  }
}

export default ChatStore;
