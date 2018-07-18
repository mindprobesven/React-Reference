import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary';
import Counter from './Counter';

import './FancyBox.scss';

const FancyBox = ({children}) => {
  return (
    <div className="FancyBox">
      {children}
    </div>
  );
};

class FancyCounter extends Component {
  render() {
    return (
      <div>
        <FancyBox>
          <ErrorBoundary>
            <Counter />
          </ErrorBoundary>
        </FancyBox>
      </div>
    );
  };
}

export default FancyCounter;