import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    const { children } = this.props;
    const { error, errorInfo } = this.state;

    if (errorInfo) {
      return (
        <div className="error-container">
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
