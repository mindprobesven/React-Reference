import React, { Component } from 'react';
import ContentBox from './ContentBox';

class TimerList extends Component {
  constructor(props) {
    super(props);
    this.contentBox1Ref = React.createRef();
    this.contentBox2Ref = React.createRef();
    this.inputTextRef = React.createRef();
  }
  
  handleClick = (ref, id) => {
    console.log(ref.current.getBoundingClientRect());
    console.log(id);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.inputTextRef.current.value);
    console.log(this.input.value);
    console.log(this.fileInput.files[0].name);
  }

  render() {
    return (
      <div>
        <ContentBox id="1" contentBoxRef={this.contentBox1Ref} onClick={(ref, id) => this.handleClick(ref, id)} />
         <br />
        <ContentBox id="2" contentBoxRef={this.contentBox2Ref} onClick={(ref, id) => this.handleClick(ref, id)} />
        <br />
        <form onSubmit={this.handleSubmit}>
          <input type="text" defaultValue="Sven" ref={this.inputTextRef} />
          <br />
          <br />
          <input type="text" defaultValue="Barbara" ref={(input) => this.input = input } />
          <br />
          <br />
          <input type="file" ref={(element) => this.fileInput = element } />
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>

      </div>
    )
  }
}

export default TimerList;