import React, { Component } from 'react';

import './style.scss';

import ChatUIClass from './ChatUIClass';
import ChatHeaderFunctionComponent from './ChatHeaderFunctionComponent';

import UserStore, { UserContext } from '../../contexts/UserStore';
import ChatStore from '../../contexts/ChatStore';

class ChatBox extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="chat-box">
        <UserStore>
          <UserContext.Consumer>
            {
              (value) => (
                /* A function component needs a consumer to subscribe to a context */
                <ChatHeaderFunctionComponent user={value.user} />
              )
            }
          </UserContext.Consumer>
        </UserStore>

        <ChatStore>
          {/* A class component can subscribe to a context inside the class with .contextType */}
          <ChatUIClass />
        </ChatStore>
      </div>
    );
  }
}

export default ChatBox;
