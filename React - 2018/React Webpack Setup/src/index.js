import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

if(module.hot) {
  module.hot.accept('./App.js', function() {
    console.log('Accepting the updated App.js module!');
  });
}
 