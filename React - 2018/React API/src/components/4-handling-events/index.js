import React from "react";

class ActionItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false
    }
  }

  toggleActionButton(e) {
    console.log(e.target);

    this.setState({
      isToggleOn: !this.state.isToggleOn
    });
  }

  toggleActionLink(e) {
    console.log(e.target);
    e.preventDefault();

    this.setState({
      isToggleOn: !this.state.isToggleOn
    });
  }

  render() {
    const currentAction = this.state.isToggleOn ? 'ON' : 'OFF';
    
    return (
      <div>
        <button onClick={(e) => this.toggleActionButton(e)}>{currentAction}</button>
        <br />
        <br />
        <a href="#" onClick={(e) => this.toggleActionLink(e)}>{currentAction}</a>
      </div>
    );
  }
}

export default ActionItems;