import React, { Component } from "react";

function logProps(Component) {
  class LogProps extends Component {
    componentDidUpdate(prevProps) {
      //console.log("before update", prevProps);
      //console.log("after update", this.props);
    }

    render() {
      const { forwardRef, ...rest } = this.props;
      return <Component {...rest} ref={forwardRef} />;
    }
  }

  const forwardRef = (props, ref) => {
    return <LogProps forwardRef={ref} {...props} />;
  };

  const name = Component.displayName || Component.name;
  forwardRef.displayName = `logProps(${name})`;

  return React.forwardRef(forwardRef);
}

export default logProps;