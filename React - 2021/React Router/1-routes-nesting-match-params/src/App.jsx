// import { hot } from 'react-hot-loader/root';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './styles/base.scss';

import ErrorBoundary from './components/ErrorBoundary';
import Home from './components/Home';
import About from './components/About';
import Dashboard from './components/Dashboard';
import MainNavigation from './components/MainNavigation';
import Topics from './components/Topics';
import NoMatch404 from './components/404';

const App = () => (
  <div className="app">
    <Router>
      <ErrorBoundary>
        <div>
          <MainNavigation />

          <hr />

          {/* A <Switch> looks through all children and renders the 'first' one whose path
          matches the current URL */}
          <Switch>
            {/* The Router component renders some UI when its path matches the current URL.  */}

            {/* The 'exact' will only be true if the path matches the location.pathname exactlly. */}
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/nestedRouteTopics">
              <Topics />
            </Route>
            {/* A <Route path="*"> always matches. When used as the last <Route> in a <Switch> it can
            be used as a "fallback" route to catch 404 errors. */}
            <Route path="*">
              <NoMatch404 />
            </Route>
          </Switch>
        </div>
      </ErrorBoundary>
    </Router>
  </div>
);

// export default hot(App);
export default App;
