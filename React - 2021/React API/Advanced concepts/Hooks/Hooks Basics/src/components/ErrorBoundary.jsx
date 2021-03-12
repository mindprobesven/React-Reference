import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
Error boundaries catch errors during rendering, in lifecycle methods, and in constructors
of the whole tree below them.

Error boundaries do not catch errors for:

- Event handlers (learn more)
- Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
- Server side rendering
- Errors thrown in the error boundary itself (rather than its children)

For those, use regular try / catch.
*/

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  // A class component becomes an error boundary if it defines either (or both)
  // of the lifecycle methods static getDerivedStateFromError() or componentDidCatch()
  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    const { children } = this.props;
    const { error, errorInfo } = this.state;

    // If an error is caught, a fallback UI can be rendered
    // With componentStack you can see where exactly in the component tree the failure has happened
    if (errorInfo) {
      return (
        <div className="container">
          <h1>Something wend wrong!</h1>
          <p>{error.toString()}</p>
          <p style={{ whiteSpace: 'pre-wrap' }}>{errorInfo.componentStack}</p>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
