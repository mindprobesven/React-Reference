import React, { Component } from 'react';
import { ThemeContext } from './ThemeContext';

export function WithThemeHOCRef(WrappedComponent) {
  class ThemedComponent extends Component {
    render() {
      const { forwardedRef, ...props } = this.props;
      
      return (
        <ThemeContext.Consumer>
          {({theme, toggleTheme}) => (
            <WrappedComponent {...props} theme={theme} toggleTheme={toggleTheme} ref={forwardedRef} />
          )}
        </ThemeContext.Consumer>
      )
    }
  }

  const forwardRef = (props, ref) => <ThemedComponent {...props} forwardedRef={ref} />;

  const name = WrappedComponent.displayName || WrappedComponent.name;
  forwardRef.displayName = `WithThemeHocRef(${name})`;

  return React.forwardRef(forwardRef);
}