// import { hot } from 'react-hot-loader/root';
import React from 'react';

import './styles/base.scss';
import './CounterWithHOC/style.scss';

import ErrorBoundary from './components/ErrorBoundary';
import CounterBox from './CounterWithHOC/CounterBox';

const App = () => (
  <div className="app">
    <ErrorBoundary>
      <div className="counter-list-container">
        <CounterBox counterID={1} />
        <CounterBox counterID={2} />
      </div>
    </ErrorBoundary>
  </div>
);

// export default hot(App);
export default App;
