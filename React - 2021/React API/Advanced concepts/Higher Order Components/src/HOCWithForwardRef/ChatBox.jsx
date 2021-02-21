/* eslint-disable no-unused-vars */
import React, { Component, useRef } from 'react';
import ChatWindow from './ChatWindow';

class ChatBox extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();
  }

  componentDidMount() {
    // The goal of this example is to get a DOM node "ref" to the text input field to
    // be able to set the focus() from this parent component on componentDidMount.
    // To achieve this, the "ref" has to be forwarded down the component tree using React.forwardRef()
    // The component ChatWindow is connected to the HOC (withDataSource). This HOC needs to forward
    // the "ref" as well.
    console.log(this.textInput.current);
    this.textInput.current.focus();
  }

  render() {
    return (
      <div className="chat_box">
        <h1>Chat</h1>
        <ChatWindow ref={this.textInput} />
      </div>
    );
  }
}

export default ChatBox;
