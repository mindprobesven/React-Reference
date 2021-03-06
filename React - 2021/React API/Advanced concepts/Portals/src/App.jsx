// import { hot } from 'react-hot-loader/root';
import React from 'react';

import './styles/base.scss';

import ErrorBoundary from './components/ErrorBoundary';
import ModalParent from './components/ModalParent';

const App = () => (
  <div className="app">
    <ErrorBoundary>
      <ModalParent />
    </ErrorBoundary>
  </div>
);

// export default hot(App);
export default App;
