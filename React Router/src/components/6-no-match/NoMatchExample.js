import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link, withRouter} from 'react-router-dom';

const NoMatchExample = () => (
  <Router>
    <div>
      <ul className="nav-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/old-match">Old link (Will redirect to will-match)</Link></li>
        <li><Link to="/will-match">Will match</Link></li>
        <li><Link to="/will-not-match">Will not match (404)</Link></li>
        <li><Link to="/will-also-not-match">Will also not match (404)</Link></li>
      </ul>

      <hr />

      <Switch>
        <Route exact path="/" component={Home} />
        <Redirect from="/old-match" to="/will-match" />
        <Route path="/will-match" render={() => <p>Is a match!</p>} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

const Home = () => (
  <p>Switch renders the first child Route which matches. A Route with no path always matches.</p>
);

const NoMatch = ({ location }) => <p>No match (404) at {location.pathname}</p>;

export default NoMatchExample;