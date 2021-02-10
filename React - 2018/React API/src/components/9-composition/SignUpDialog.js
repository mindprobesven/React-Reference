import React, { Component } from "react";
import FancyBox from "Components/9-composition/FancyBox";

function Dialog(props) {
  return (
    <FancyBox color={props.dialogColor}>
      <h1>{props.title}</h1>
      <p>{props.message}</p>
      <p>{props.message}</p>
      <p>{props.message}</p>
      <hr />
      {props.children}
    </FancyBox>
  );
}

class SignUpDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      dialogColor: 'grey'
    };
  }

  handleLoginChange(e) {
    this.setState({ login: e.target.value });
  }

  handleSubmit(e) {
    console.log(`Welcome, ${this.state.login}!`);
    this.setState({ dialogColor: 'blue' });
  }

  render() {
    return (
      <Dialog title="Spacecraft Entry Check" 
              message="What is your handle?"
              dialogColor={this.state.dialogColor}>
        <input type="text" value={this.state.login} onChange={(e) => this.handleLoginChange(e)} />
        <button onClick={(e) => this.handleSubmit(e)}>Sign Up!</button>
      </Dialog>
    );
  }
}

export default SignUpDialog;