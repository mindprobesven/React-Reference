/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Sidebar = ({ routes }) => (
  <div className="sidebar">
    <Switch>
      {
        routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
          >
            {route.sidebar}
          </Route>
        ))
      }
    </Switch>
  </div>
);

export default Sidebar;
