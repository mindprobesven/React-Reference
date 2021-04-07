/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import { Link, Switch } from 'react-router-dom';
import RouteWithSubRoutes from './RouteWithSubRoutes';

const Section = ({ routes }) => (
  <div className="container">
    <div className="sidebar">
      <ul>
        {
          routes.map((route, index) => (
            <li key={index}>
              <Link to={route.path}>{route.label}</Link>
            </li>
          ))
        }
      </ul>
    </div>
    <div className="main">
      <Switch>
        {
          routes.map((route, index) => (
            <RouteWithSubRoutes
              key={index}
              {...route}
            />
          ))
        }
      </Switch>
    </div>
  </div>
);

export default Section;
