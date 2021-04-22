/* eslint-disable max-len */
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
    <ErrorBoundary>
      <Router>
        <div>
          <MainNavigation />

          <hr />

          {/* A <Switch> looks through all children and renders the 'first' one whose path
          matches the current URL. It uses 'location' by default, which contains the current URL data.
          <Switch location={location}> */}
          <Switch>
            {/* The <Route> component renders a UI component when its path matches the current URL. */}

            {/* The 'exact' will only be true if the path matches the location.pathname exactly. */}
            <Route exact path="/">
              <Home />
            </Route>
            {/* Not specifying 'exact' will consider this path (/about/bla) also as a match and render
            <About> instead of a 404.  */}
            <Route path="/about">
              <About />
            </Route>
            {/* The 'exact' here will only render <Dashboard> with the path (/dasboard). Therefore, the path
            ( (/dashboard/bla) will results in a 404 */}
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            {/* <Topics> contains nested routes, so we don't specify 'exact'.
            A path like (/nestedRouteTopics/electronics) will render the <Topics> component, as
            well as the nested route component inside <Topics> that has a match. */}
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
      </Router>
    </ErrorBoundary>
  </div>
);

// export default hot(App);
export default App;
