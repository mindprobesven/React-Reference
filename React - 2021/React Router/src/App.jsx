// import { hot } from 'react-hot-loader/root';
import React from 'react';

import './styles/base.scss';

import ErrorBoundary from './components/ErrorBoundary';

const App = () => (
  <div className="app">
    <ErrorBoundary>
      
    </ErrorBoundary>
  </div>
);

// export default hot(App);
export default App;
