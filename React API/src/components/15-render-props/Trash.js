import React, { Component } from "react";
import logProps from './logProps';

class Trash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseDown: false,
      positionX: this.props.iconProps.x + (this.props.iconProps.width / 2),
      positionY: this.props.iconProps.y + (this.props.iconProps.height / 2),
      width: this.props.iconProps.width,
      height: this.props.iconProps.height
    }
  }

  handleMouseDown = (e) => {   
    document.onmouseup = null;
    
    this.setState({
      isMouseDown: true,
      positionX: this.props.mouse.x,
      positionY: this.props.mouse.y
    });

    document.onmousemove = (e) => {
      this.setState({
        positionX: this.props.mouse.x,
        positionY: this.props.mouse.y
      });
    }

    document.onmouseup = (e) => {
      this.setState({
        isMouseDown: false
      });

      document.onmousemove = null;
      this.props.onClick(this.props.iconRef);
    }
  }

  render() {   
    return (
      <div ref={this.props.iconRef} onMouseDown={this.handleMouseDown} style={{ 
        position: 'absolute', 
        top: this.state.isMouseDown ? (this.props.mouse.y) : (this.state.positionY), 
        left: this.state.isMouseDown ? (this.props.mouse.x) : (this.state.positionX),
        width: `${this.state.width}px`, 
        height: `${this.state.height}px`, 
        background: 'red', 
        userSelect: 'none', 
        pointerEvents:  this.state.isMouseDown ? 'none' : 'all',
        cursor: 'pointer',
        transform: 'translate(-50%, -50%)'
      }}>
      </div>
    )
  }
}

export default logProps(Trash);