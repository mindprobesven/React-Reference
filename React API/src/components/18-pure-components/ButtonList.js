import React, { Component, PureComponent } from 'react';

/*
class CounterButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  
  add = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }))
  }

  render() {
    const count = this.state.count;

    return (
      <button onClick={this.add}>Count: {count}</button>
    )
  }
}
*/

class CounterButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.count !== this.state.count) {
      return true
    }
    return false
  }

  add = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }))
  }

  render() {
    const count = this.state.count;

    return (
      <button onClick={this.add}>Count: {count}</button>
    )
  }
}

class ButtonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: []
    };
  }

  generateID = buttons => {
    let highestID = 0;    
    buttons.map(button => {
      if(Number.isInteger(button.id) && button.id > highestID) {
        highestID = button.id;
      }
    });

    return highestID + 1;
  }

  addButton = (e) => {
    const buttons = this.state.buttons;
    const id = this.generateID(buttons);

    this.setState(prevState => ({
      buttons: [...prevState.buttons, { id } ]
    }));
  }

  render() {
    console.log(this.state.buttons);
    const buttons = this.state.buttons;
    
    return (
      <div>
        <button onClick={this.addButton}>Add Counter</button>
        <br />
        <br />
        {buttons.map(button => (
          <React.Fragment key={button.id}>
            <CounterButton  id={button.id} />
            <br />
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default ButtonList;