import React, { Component } from 'react';
import { ThemeContext, themes } from './ThemeContext';

class ToggleThemeButton extends Component {
  componentDidMount() {
    console.log('Mounted: ' + JSON.stringify(this.props));
  }

  ComponentDidUpdate(prevProps, prevState) {
    console.log('Did Update');
    console.log('Before:' + prevProps);
    console.log('Current:' + this.props);
  }

  render() {
    const { theme, toggleTheme, children } = this.props;
    
    return (
      <button onClick={toggleTheme} style={{ background: theme.background, color: theme.foreground }}>{children}</button>
    )
  }
}

export default props => (
  <ThemeContext.Consumer>
    {({theme, toggleTheme}) => (
      <ToggleThemeButton {...props} toggleTheme={toggleTheme} theme={theme} />
    )}
  </ThemeContext.Consumer>
);