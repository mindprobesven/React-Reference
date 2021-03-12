/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';

import DataSource from './DataSource';

const withDataSource = (WrappedComponent) => {
  class WithDataSource extends Component {
    constructor(props) {
      super(props);

      this.state = {
        counter: DataSource.getCounter(),
      };
    }

    componentDidMount() {
      DataSource.subscribe(this.handleUpdate);
    }

    componentWillUnmount() {
      DataSource.unsubscribe();
    }

    handleUpdate = () => {
      this.setState(({
        counter: DataSource.getCounter(),
      }));
    }

    handleReset = () => {
      DataSource.resetCounter();
    }

    handleStop = () => {
      DataSource.stopCounter();
    }

    render() {
      const { counter } = this.state;

      return (
        <WrappedComponent
          data={counter}
          handleReset={this.handleReset}
          handleStop={this.handleStop}
          {...this.props}
        />
      );
    }
  }

  WithDataSource.displayName = `WithDataSource(${WrappedComponent.name})`;
  return WithDataSource;
};

export default withDataSource;
