// import { hot } from 'react-hot-loader/root';
import React from 'react';

import './styles/base.scss';
import BuggyClassComponent from './components/BuggyClassComponent';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => (
  <div className="app">
    <ErrorBoundary>
      <BuggyClassComponent />
    </ErrorBoundary>
  </div>
);

// export default hot(App);
export default App;
