/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route } from 'react-router-dom';
import Gallery from './Gallery';

const RouteWithSubRoutes = (route) => {
  // console.log(route);

  return (
    <Route
      path={route.path}
    >
      <route.component routes={route.routes} />
    </Route>
  );
};

export default RouteWithSubRoutes;
