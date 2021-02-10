import React from 'react';
import { ThemeContext } from './ThemeContext';

export function WithThemeHOC(Component) {
  return function ThemedComponent(props) {
    return (
      <ThemeContext.Consumer>
        {({theme, toggleTheme}) => (
          <Component {...props} theme={theme} toggleTheme={toggleTheme} />
        )}
      </ThemeContext.Consumer>
    )
  }
}