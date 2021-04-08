import React from 'react';
import { Route } from 'react-router-dom';

const RouteWithSubRoutes = (route) => {
  // Render the <Route> with the route path that matches the current URL (either partially or exactly)
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
