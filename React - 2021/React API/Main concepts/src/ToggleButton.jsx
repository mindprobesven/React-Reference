import React, { Component } from 'react';

class ToggleButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isToggle: false,
      buttonClicked: null,
    };
  }

  handleClickNoParams = (e) => {
    console.log(`Clicked button no params: ${e.type}`);

    this.setState((state) => ({
      isToggle: !state.isToggle,
      buttonClicked: null,
    }));
  }

  handleClickWithParams = (id, e) => {
    console.log(`Clicked button: ${id}: ${e.type}`);

    this.setState((state) => ({
      isToggle: !state.isToggle,
      buttonClicked: id,
    }));
  }

  render() {
    const { isToggle, buttonClicked } = this.state;

    return (
      <div>
        <button
          type="button"
          onClick={(e) => this.handleClickWithParams('button1', e)}
        >
          Toggle Button
        </button>
        <p>{isToggle ? 'ON' : 'OFF'}</p>
        <p>{buttonClicked}</p>

        <button type="button" onClick={this.handleClickNoParams}>
          Toggle Button (No Params)
        </button>
        <p>{isToggle ? 'ON' : 'OFF'}</p>
      </div>
    );
  }
}

export default ToggleButton;
