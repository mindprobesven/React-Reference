import React, { Component } from 'react';
import './Menu.scss';

const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} onClick={props.onClick} className="FancyButton">
    {props.children}
  </button>
));

class Menu extends Component {
  constructor(props) {
    super(props);

    this.clickButton = React.createRef();
    this.positionButton = React.createRef();
  }
  
  getElementPosition = () => {
    console.log(this.clickButton.current.getBoundingClientRect());
    console.log(this.positionButton.current.getBoundingClientRect());
  }
  
  render() {
    return (
      <div>
        <FancyButton ref={this.clickButton}>Click Me!</FancyButton>
        <br />
        <br />
        <FancyButton ref={this.positionButton} onClick={this.getElementPosition}>Get Position</FancyButton>
      </div>
    );
  };
  
}

export default Menu;