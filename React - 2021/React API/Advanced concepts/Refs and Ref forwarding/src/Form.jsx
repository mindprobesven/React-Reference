// ----------------------------------------------------------------------------------------
// Refs and ref forwarding
//
// Refs provide a way to access DOM nodes or React elements created in the render method.
//
// Ref forwarding is a technique for automatically passing a ref through a component to one
// of its children. Ref forwarding lets components opt into exposing any child component’s
// ref as their own.
// ----------------------------------------------------------------------------------------

import React, { Component } from 'react';

import InputTextStateless from './InputTextStateless';
import InputTextClass from './InputTextClass';

class Form extends Component {
  constructor(props) {
    super(props);

    this.inputTextStatelessRef = React.createRef();
    this.inputTextClassRef = React.createRef();

    this.state = {};
  }

  componentDidMount() {
    // A "ref" was created to store a reference of the DOM node <input> contained in these two components
    // It is now possible to access the DOM node <input> and set the focus() from this parent component
    this.inputTextStatelessRef.current.focus();
    // this.inputTextClassRef.current.focus();
  }

  render() {
    return (
      <div className="form">
        <h1>Form Component</h1>
        <InputTextStateless />
        <InputTextStateless ref={this.inputTextStatelessRef} />
        <InputTextClass ref={this.inputTextClassRef} />
        <InputTextClass />
      </div>
    );
  }
}

export default Form;
