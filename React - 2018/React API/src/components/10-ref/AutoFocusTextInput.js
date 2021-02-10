import React, { Component } from 'react';
import CustomTextInput from './CustomTextInput';

class AutoFocusTextInput extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }


  render() {
    return (
      <div>
        <CustomTextInput ref={this.textInput} />
      </div>
    );
  };
}

export default AutoFocusTextInput;