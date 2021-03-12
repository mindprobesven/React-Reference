// import { hot } from 'react-hot-loader/root';
import React from 'react';

import './styles/base.scss';

import ErrorBoundary from './components/ErrorBoundary';
import CounterList from './components/CounterList';

const App = () => (
  <div className="app">
    <ErrorBoundary>
      <CounterList />
    </ErrorBoundary>
  </div>
);

// export default hot(App);
export default App;
