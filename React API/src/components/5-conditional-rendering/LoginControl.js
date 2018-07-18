import React, { Component } from "react";

import Greeting from "Components/5-conditional-rendering/Greeting";
import Warning from "Components/5-conditional-rendering/Warning";

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>Login</button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>Logout</button>
  );
}

class LoginControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      showWarning: true
    }
  }

  handleLoginClick() {
    this.setState(prevState => ({
      isLoggedIn: !prevState.isLoggedIn,
      showWarning: false
    }));
  }
  
  handleLogoutClick() {
    this.setState(prevState => ({
      isLoggedIn: !prevState.isLoggedIn,
      showWarning: true
    }));
  }

  render() {
    const button = this.state.isLoggedIn ? (<LogoutButton onClick={() => {this.handleLogoutClick()}} />) : (<LoginButton onClick={() => {this.handleLoginClick()}} />);
    
    return (
      <div>
        <Warning showWarning={this.state.showWarning} />
        <Greeting isLoggedIn={this.state.isLoggedIn} />
        {button}
      </div>
    );
  }
}

export default LoginControl;