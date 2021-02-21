/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

const withDataSource = (WrappedComponent) => {
  class WithDataSource extends Component {
    render() {
      const { forwardedRef, ...rest } = this.props;

      return (
        <WrappedComponent
          data="Injected data from HOC"
          ref={forwardedRef}
          {...rest}
        />
      );
    }
  }

  const forwardRef = React.forwardRef((props, ref) => (
    <WithDataSource {...props} forwardedRef={ref} />
  ));

  forwardRef.displayName = `WithDataSource(${WrappedComponent.displayName})`;

  return forwardRef;
};

export default withDataSource;
