import React, { Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ComponentWithRegex from './ComponentWithRegex';

const ParamsExample = () => (
  <Router>
    <div>
      <ul className="nav-list">
        <li><Link to={'/order/desc'}>Cars => Descending</Link></li>
        <li><Link to={'/order/asc'}>Cars => Ascending</Link></li>
        <li><Link to={'/order/foo'}>Cars => Invalid param foo</Link></li>
      </ul>

      <hr />

      <Route path={'/:id'} component={Child} />
      <hr />
      <Route path={'/order/:direction(asc|desc)'} component={ComponentWithRegex} />
    </div>
  </Router>
);

const Child =({match}) => (<h3>{match.params.id}</h3>);

export default ParamsExample;