// import { hot } from 'react-hot-loader/root';
import React from 'react';

import './styles/base.scss';
import './styles/style.scss';

import ErrorBoundary from './components/ErrorBoundary';
import AnimatedImageView from './components/AnimatedImageView';

const App = () => (
  <div className="app">
    <ErrorBoundary>
      <AnimatedImageView />
    </ErrorBoundary>
  </div>
);

// export default hot(App);
export default App;
