import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: '',
      errorInfo: ''
    }
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true, 
      error: error.toString(),
      errorInfo: info.componentStack
    }); 
  }

  render() {
    if(this.state.hasError) {
      return (
        <div>
          <p>Uuups! Something wend wrong.</p>
          <hr />
          <p>{this.state.error}</p>
          <p>{this.state.errorInfo}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;