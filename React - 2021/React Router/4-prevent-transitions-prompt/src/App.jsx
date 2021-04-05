/* eslint-disable max-len */
// import { hot } from 'react-hot-loader/root';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import './styles/base.scss';
import './styles/style.scss';

import ErrorBoundary from './components/ErrorBoundary';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import BlockingForm from './components/BlockingForm';

const App = () => (
  <div className="app">
    <ErrorBoundary>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/form">Form</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>

        <hr />

        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/form">
              <BlockingForm />
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
