import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const AmbiguousExample = () => (
  <Router>
    <div>
    <ul className="nav-list">
      <li><Link to="/">Home (Static)</Link></li>
      <li><Link to="/about">About (Static)</Link></li>
      <li><Link to="/sven">Sven Kohn (Dynamic)</Link></li>
    </ul>

    <hr />

    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/:user" component={User} />
    </Switch>

    </div>
  </Router>
);

const User = ({ match }) => {
  console.log(match);

  return (
    <p>User content for - {match.params.user}</p>
  )
};

const Home = ({ match }) => {
  console.log(match);
  return (
    <p>Home content at {match.path}</p>
  )
};

const About = ({ match }) => {
  console.log(match);
  return (
    <p>About content at {match.path}</p>
  )
};

export default AmbiguousExample;