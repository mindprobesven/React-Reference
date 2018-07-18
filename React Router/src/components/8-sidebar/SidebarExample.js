import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './SidebarExample.scss';

const routes = [
  { path: "/", exact: true, sidebar: () => <p>Home!</p>, main: () => <p>Home content.</p> },
  { path: "/computers", sidebar: () => <p>Computers!</p>, main: () => <p>Computers content.</p> },
  { path: "/cars", sidebar: () => <p>Cars!</p>, main: () => <p>Cars content.</p> },
  { path: "/food", sidebar: () => <p>Food!</p>, main: () => <p>Food content.</p> }
];

const SidebarExample = () => (
  <Router>
    <div className="page-container">
      <div className="sidebar">
        <h3>Menu</h3>
        <ul className="nav-list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/computers">Computers</Link></li>
          <li><Link to="/cars">Cars</Link></li>
          <li><Link to="/food">Food</Link></li>
        </ul>
        <hr />
        {routes.map((route, index) => (
          <Route key={index} path={route.path} exact={route.exact} component={route.sidebar} />
        ))}
      </div>
      <div className="main">
        <h3>Content Page</h3>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} exact={route.exact} component={route.main} />
        ))}
      </div>
    </div>
  </Router>
);

export default SidebarExample;