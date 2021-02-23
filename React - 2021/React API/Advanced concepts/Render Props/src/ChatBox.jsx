import React, { Component } from 'react';

import ChatData from './ChatData';
import UserData from './UserData';

class ChatBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      textInput: e.target.value,
    });
  }

  render() {
    const { textInput } = this.state;

    return (
      <div className="chat-box">
        <ChatData render={(chatData) => (
          <UserData render={(userData) => (
            <>
              <h1>{`${userData.name} - Chat Room`}</h1>
              <textarea
                className="message-text"
                value={chatData.state.messages.join('\n')}
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
                onClick={() => chatData.newMessage(textInput)}
              >
                Send!
              </button>
            </>
          )}
          />
        )}
        />
      </div>
    );
  }
}

/* ChatBox.propTypes = {
  render: PropTypes.func.isRequired,
}; */

export default ChatBox;
