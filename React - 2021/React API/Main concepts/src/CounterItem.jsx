import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CounterItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevCount: 0,
      counter: 0,
    };
  }

  componentDidMount() {
    this.updateCounter();
  }

  componentDidUpdate(prevProps) {
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
    const { prevCount } = this.state;

    if (count - prevCount >= intervalAt) {
      this.setState((state, props) => ({
        prevCount: props.count,
        counter: state.counter + 1,
      }));
    }
  }

  render() {
    const { counterID, intervalAt, count } = this.props;
    const { prevCount, counter } = this.state;

    return (
      <div>
        <p>
          {
            `Counter ${counterID} - [ ${intervalAt} ]: ${count} => 
            ${prevCount} => ${counter}`
          }
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
