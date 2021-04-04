/* eslint-disable max-len */
// import { hot } from 'react-hot-loader/root';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './styles/base.scss';
import './styles/style.scss';

import ErrorBoundary from './components/ErrorBoundary';
import Home from './components/Home';
import About from './components/About';
import Dashboard from './components/Dashboard';
import CustomLinkButton from './components/CustomLinkButton';

const App = () => (
  <div className="app">
    <ErrorBoundary>
      <Router>
        <div>
          <ul>
            <li>
              <CustomLinkButton
                to="/"
                label="Home"
              />
            </li>
            <li>
              <CustomLinkButton
                to="/about"
                label="About"
              />
            </li>
            <li>
              <CustomLinkButton
                to="/dashboard"
                label="Dashboard"
              />
            </li>
          </ul>
        </div>

        <hr />

        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    </ErrorBoundary>
  </div>
);

// export default hot(App);
export default App;
