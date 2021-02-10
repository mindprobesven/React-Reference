import React, { Component } from 'react';
import './CustomTextInput.scss';

class CustomTextInput extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();
  }

  focusTextInput = () => {
    this.textInput.current.focus();
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.textInput} />
        <br />
        <br />
        <button onClick={this.focusTextInput}>Focus</button>
      </div>
    );
  };
}

export default CustomTextInput;