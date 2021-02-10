import React, { Component } from 'react';
import { ThemeContext, themes } from './ThemeContext';
import ToggleThemeButton from './ToggleThemeButton';
import { WithThemeHOC } from './WithThemeHOC';
import { WithThemeHOCRef } from './WithThemeHOCRef';

class FancyButton extends Component {
  render() {
    const { theme, toggleTheme, children } = this.props;
    
    return (
      <button ref={this.props.buttonRef} onClick={toggleTheme} onMouseUp={this.props.onShowPosition} style={{ background: theme.background, color: theme.foreground }}>{children}</button>
    )
  }
}

const Button = props => {
  const { theme, toggleTheme, children } = props;
  
  return (
    <button onClick={toggleTheme} style={{ background: theme.background, color: theme.foreground }}>{props.children}</button>
  )
}

const ThemedButton = props => {
  return (
    <ThemeContext.Consumer>
      {({theme}) => (
        <button style={{ background: theme.background, color: theme.foreground }}>{props.children}</button>
      )}
    </ThemeContext.Consumer>
  )
}

const ToolBar = props => {
  const ThemedButtonWithHOC = WithThemeHOC(Button);
  const ThemedButtonWithHOCRef = WithThemeHOCRef(FancyButton);

  const ref = React.createRef();
  
  function showPosition() {
    console.log(ref.current.getBoundingClientRect());
  }

  return (
    <React.Fragment>
    <ThemedButton>Click Me</ThemedButton>
    <br />
    <br />
    <ToggleThemeButton>Toggle Me</ToggleThemeButton>
    <br />
    <br />
    <ThemedButtonWithHOC>Themed with HOC</ThemedButtonWithHOC>
    <br />
    <br />
    <ThemedButtonWithHOCRef buttonRef={ref} onShowPosition={showPosition}>Themed with Hoc and Ref</ThemedButtonWithHOCRef>
    </React.Fragment>
  )
}

class ContextApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.dark,
      toggleTheme: this.handleToggle
    }
  }

  handleToggle = () => {
    this.setState(prevState => ({
      theme: prevState.theme === themes.dark ?
      themes.light : themes.dark
    }));
  }
  
  render() {
    return (
      <div>
        <ThemeContext.Provider value={this.state}>
          <ToolBar onClick={this.handleToggle} /> 
        </ThemeContext.Provider>
        <br />
        <br />
        <ThemedButton>Click Me</ThemedButton>
      </div>
    )
  }
}

export default ContextApp;