/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class InputTextClass extends Component {
  render() {
    const { innerRef } = this.props;

    return (
      <input type="text" className="text_input" ref={innerRef} />
    );
  }
}

const forwardRef = (props, ref) => (
  <InputTextClass innerRef={ref} {...props} />
);

forwardRef.displayName = InputTextClass.name;

export default React.forwardRef(forwardRef);
