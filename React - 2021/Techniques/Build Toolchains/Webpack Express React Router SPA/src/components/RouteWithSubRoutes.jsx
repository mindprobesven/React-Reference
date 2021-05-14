import React from 'react';
import { Route } from 'react-router-dom';

const RouteWithSubRoutes = (route) => {
  console.log(route.computedMatch);

  return (
    <Route
      path={route.path}
    >
      <route.component routes={route.routes} />
    </Route>
  );
};

export default RouteWithSubRoutes;
