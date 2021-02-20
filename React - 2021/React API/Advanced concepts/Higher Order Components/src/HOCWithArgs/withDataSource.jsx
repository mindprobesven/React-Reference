/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import DataSource from './DataSource';

const withDataSource = (WrappedComponent, selectDataMethod) => {
  class WithDataSource extends Component {
    constructor(props) {
      super(props);

      this.DataSource = new DataSource();

      this.state = {
        data: selectDataMethod(this.DataSource, props),
      };
    }

    componentDidMount() {
      console.log('HOC Mounted');
      this.DataSource.addChangeListener(this.changeHandler);
    }

    componentWillUnmount() {
      this.DataSource.removeChangeListener();
    }

    changeHandler = () => {
      this.setState({
        data: selectDataMethod(this.DataSource, this.props),
      });
    }

    render() {
      const { data } = this.state;

      return (
        <WrappedComponent data={data} {...this.props} />
      );
    }
  }

  WithDataSource.displayName = `WithDataSource(${WrappedComponent.name})`;
  return WithDataSource;
};

export default withDataSource;
