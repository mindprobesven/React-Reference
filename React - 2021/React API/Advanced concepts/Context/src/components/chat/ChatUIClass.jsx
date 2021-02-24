import React, { Component } from 'react';
import { ChatContext } from '../../contexts/ChatStore';

class ChatUIClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: '',
    };
  }

  handleChange = (e) => {
    this.setState(({
      textInput: e.target.value,
    }));
  }

  render() {
    const { textInput } = this.state;
    const { messages, newMessage } = this.context;

    return (
      <>
        <textarea
          className="message-text"
          value={messages.join('\n')}
          readOnly
        />
        <input
          type="text"
          className="input-text"
          value={textInput}
          onChange={this.handleChange}
        />
        <button
          type="button"
          className="send-button"
          onClick={() => newMessage(textInput)}
        >
          Send!
        </button>
      </>
    );
  }
}

ChatUIClass.contextType = ChatContext;

export default ChatUIClass;
