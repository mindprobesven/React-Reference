import React, { Component } from "react";

function Warning(props) {
  if(!props.showWarning) {
    return null;
  }
  else {
    return (
      <h3>Warning: Please login!</h3>
    );
  }
}

export default Warning;