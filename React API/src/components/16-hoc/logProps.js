import React, { Component } from 'react';
import DataSource from './DataSource';

const _DataSource = new DataSource();

function logProps(WrappedComponent, selectData) {
  class LogProps extends Component {
    constructor(props) {
      super(props);
      this.state = {
        date: new Date().getSeconds().toString(),
        custom: ''
      }
    }

    getData() {
      selectData(_DataSource).then(data => this.setState({ custom: data.getSeconds().toString() }));
    }

    componentWillMount() {
      this.getData();
    }

    componentDidMount(props) {
      //console.log('L Did Mount');

      this.timerID = setInterval(() => {
        this.getData();
      }, 1000);
    }

    componentWillUpdate(props) {
      //console.log('L Will Update');
    }
    
    componentWillUnmount() {
      clearInterval(this.timerID);
    }

    render() {
      const { forwardedRef, ...passThroughProps } = this.props;

      return (
        <WrappedComponent {...passThroughProps} data={this.state.date} custom={this.state.custom} ref={forwardedRef} />
      );
    }
  }

  const forwardRef = (props, ref) => <LogProps {...props} forwardedRef={ref} />;
  const name = WrappedComponent.displayName || WrappedComponent.name;
  forwardRef.displayName = `logProps(${name})`;

  return React.forwardRef(forwardRef);
}

export default logProps;