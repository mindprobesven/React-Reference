import React, { Component } from "react";

function UserGreeting(props) {
  return (
    <h1>Hello User!</h1>
  );
}

function GuestGreeting(props) {
  return (
    <h1>Hello Guest!</h1>
  );
}

function Greeting(props) {
  return (
    props.isLoggedIn ? (<UserGreeting />) : (<GuestGreeting />)
  );
}

export default Greeting;