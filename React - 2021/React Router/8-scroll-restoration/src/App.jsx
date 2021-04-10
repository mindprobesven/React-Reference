/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
// import { hot } from 'react-hot-loader/root';
import React from 'react';
import {
  BrowserRouter as Router, Link, Route,
} from 'react-router-dom';

import './styles/base.scss';
import './styles/style.scss';

import ErrorBoundary from './components/ErrorBoundary';
import Home from './components/Home';
import About from './components/About';
import Dashboard from './components/Dashboard';
import ScrollToTop from './components/ScrollToTop';

const App = () => (
  <div className="app">
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <div className="header">
          <div className="menu">
            <div className="item">
              <Link
                to={{
                  pathname: '/',
                  state: { lastScrollPosY: 500 },
                }}
              >
                Home
              </Link>
            </div>
            <div className="item">
              <Link to="/about">About</Link>
            </div>
            <div className="item">
              <Link to="/dashboard">Dashboard</Link>
            </div>
          </div>
        </div>
        <div className="body">
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </div>
      </Router>
    </ErrorBoundary>
  </div>
);

// export default hot(App);
export default App;
