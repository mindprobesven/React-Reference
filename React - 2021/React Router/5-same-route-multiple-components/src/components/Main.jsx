/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Main = ({ routes }) => (
  <div className="main">
    <Switch>
      {
        routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
          >
            {route.main}
          </Route>
        ))
      }
    </Switch>
  </div>
);

export default Main;
