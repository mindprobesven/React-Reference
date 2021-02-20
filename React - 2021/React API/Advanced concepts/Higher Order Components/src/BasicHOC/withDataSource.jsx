/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import DataSource from './DataSource';

const withDataSource = (WrappedComponent) => {
  class WithDataSource extends Component {
    constructor(props) {
      super(props);

      this.DataSource = new DataSource();

      this.state = {
        data: this.DataSource.getCounter(1),
      };
    }

    componentDidMount() {
      this.DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      this.DataSource.removeChangeListener();
    }

    handleChange = () => {
      this.setState({ data: this.DataSource.getCounter(1) });
    }

    render() {
      const { data } = this.state;

      return <WrappedComponent data={data} {...this.props} />;
    }
  }

  WithDataSource.displayName = `WithDataSource(${WrappedComponent.name})`;
  return WithDataSource;
};

export default withDataSource;
