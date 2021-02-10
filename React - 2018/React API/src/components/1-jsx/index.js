import React from "react";

class JSX extends React.Component {
  render() {
    const name = 'Sven';
    const imageUrl = 'https://picsum.photos/100/100';

    return (
      <div>
        <h1>Hello, {name}!</h1>
        <img src={imageUrl} />
      </div>
    );
  }
}

export default JSX;