/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import InputText from './InputText';
import withDataSource from './withDataSource';

class ChatWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: '',
    };
  }

  handleChange = (e) => {
    this.setState({ textInput: e.target.value });
  }

  render() {
    const { data, innerRef } = this.props;
    const { textInput } = this.state;

    return (
      <div>
        <textarea className="messages_text" value={data} readOnly />
        <InputText
          ref={innerRef}
          value={textInput}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

const forwardRef = React.forwardRef((props, ref) => (
  <ChatWindow innerRef={ref} {...props} />
));

forwardRef.displayName = ChatWindow.name;

export default withDataSource(forwardRef);
