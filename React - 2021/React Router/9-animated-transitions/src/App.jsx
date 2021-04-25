/* eslint-disable max-len */
// import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import './sass/main.scss';

import ErrorBoundary from './components/ErrorBoundary';
import RoutesWithTransition from './components/RoutesWithTransition';

const App = () => (
  <div className="app">
    <ErrorBoundary>
      <Router>
        <div className="header">
          <ul className="menu">
            <li className="menu__button">
              <Link to="/">Home</Link>
            </li>
            <li className="menu__button">
              <Link to="/about">About</Link>
            </li>
            <li className="menu__button">
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>
        <div className="body">
          <RoutesWithTransition />
        </div>
      </Router>
    </ErrorBoundary>
  </div>
);

// export default hot(App);
export default App;
