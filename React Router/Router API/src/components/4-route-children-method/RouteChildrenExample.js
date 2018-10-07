import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const RouteChildrenExample = () => (
  <Router>
    <div>
      <h3>Route Children Example</h3>
      <CustomLink to="/" activeOnlyWhenExact={true} label="Home" />
      <CustomLink to="/about" label="About" />

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  </Router>
);

const CustomLink = ({ to, activeOnlyWhenExact ,label }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <div>
      { match ? '> ' : '' }
      <Link to={to}>{label}</Link>
    </div>
  )} />
);

const Home = () => (
  <div>
    <h3>Home page</h3>
  </div>
);

const About = () => (
  <div>
    <h3>About page</h3>
  </div>
);

export default RouteChildrenExample;