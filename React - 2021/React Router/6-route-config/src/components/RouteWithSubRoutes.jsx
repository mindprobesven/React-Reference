/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route } from 'react-router-dom';

const RouteWithSubRoutes = (route) => (
  <Route
    path={route.path}
    render={(props) => (
      <route.component {...props} routes={route.routes} />
    )}
  />
);

export default RouteWithSubRoutes;
