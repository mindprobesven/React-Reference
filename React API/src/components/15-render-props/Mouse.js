import React, { Component } from 'react';
import './Mouse.scss';

class Mouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0
    }
  }

  handleMouseMove = (e) => {  
    const offset = {
      x: e.currentTarget.getBoundingClientRect().x,
      y: e.currentTarget.getBoundingClientRect().y,
    };
    
    this.setState({ x: (e.clientX - offset.x), y:(e.clientY - offset.y) });
  }

  render() {
    return (
      <div className="MouseArea" onMouseMove={this.handleMouseMove}>
        <p>Mouse X: {this.state.x} - Mouse Y: {this.state.y}</p>
        {this.props.render(this.state)}
      </div>
    );
  }
}

export default Mouse;