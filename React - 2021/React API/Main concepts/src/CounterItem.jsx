import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CounterItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCount: 0,
      counter: 0,
    };
  }

  componentDidMount() {
    console.log(`===>===> ${this.constructor.name} did mount`);
    this.updateCounter();
  }

  componentDidUpdate(prevProps) {
    console.log(`===>===> ${this.constructor.name} did update`);

    const { count } = this.props;

    if (prevProps.count !== count) {
      this.updateCounter();
    }
  }

  componentWillUnmount() {
    console.log(`===>===> ${this.constructor.name} will unmount`);
  }

  updateCounter() {
    const { count, intervalAt } = this.props;
    const { currentCount } = this.state;

    if (count - currentCount >= intervalAt) {
      this.setState((state, props) => ({
        currentCount: props.count,
        counter: state.counter + 1,
      }));
    }
  }

  render() {
    const { counterID, intervalAt, count } = this.props;
    const { currentCount, counter } = this.state;

    return (
      <div>
        <p>
          {`Counter ${counterID} - 
          [ ${intervalAt} ]: ${count} => ${currentCount} => ${counter}`}
        </p>
      </div>
    );
  }
}

CounterItem.propTypes = {
  counterID: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  intervalAt: PropTypes.number.isRequired,
};

export default CounterItem;
