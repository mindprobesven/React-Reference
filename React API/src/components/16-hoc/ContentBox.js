import React, { Component } from 'react';
import logProps from './logProps';
import './ContentBox.scss';

class ContentBox extends Component {
  constructor(props) {
    super(props);
  }
  
handleClick = () => {
  this.props.onClick(this.props.contentBoxRef, this.props.id);
}

  render() {
    return (
      <div onClick={this.handleClick} className="ContentBox" ref={this.props.contentBoxRef}>
      <h1>Box ID {this.props.id}</h1>
      <p>{this.props.data.toString()}</p>
      <p>{this.props.custom.toString()}</p>
      </div>
    );
  }
}

export default logProps(ContentBox, (DataSource) => DataSource.getData());