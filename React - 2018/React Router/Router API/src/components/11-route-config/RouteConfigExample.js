import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Computers = () => <h3>Computers content</h3>;

const Cars = ({ routes }) => {
  console.log(routes);
  
  return (
    <div>
      <ul className="nav-list">
        {routes.map((route, index) => <li key={index}><Link to={route.path}>{route.component.name}</Link></li> )}
      </ul>

      <hr />

      {routes.map((route, index) => <RouteWithSubRoutes key={index} {...route} />)}
    </div>
  );
};

const Mercedes = () => <h3>Mercedes content</h3>;
const Audi = () => <h3>Audi content</h3>;

const RouteConfigExample = () => (
  <Router>
    <div>
      <ul className="nav-list">
        <li><Link to="/computers">Computers</Link></li>
        <li><Link to="/cars">Cars</Link></li>
      </ul>

      <hr />

      {routes.map((route, index) => <RouteWithSubRoutes key={index} {...route} />)}
    </div>
  </Router>
);

const RouteWithSubRoutes = (route, props) => {
  //console.log(route);
  //console.log(props);
  
  return (
    <Route path={route.path} render={props => <route.component {...props} routes={route.routes} />} />
  );
}

const routes = [
  {
    path: "/computers",
    component: Computers
  },
  {
    path: "/cars",
    component: Cars,
    routes: [
      {
        path: "/cars/audi",
        component: Audi
      },
      {
        path: "/cars/merceds",
        component: Mercedes
      }
    ]
  }
];

export default RouteConfigExample;