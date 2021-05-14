/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Link, Switch, Route, useRouteMatch,
} from 'react-router-dom';
import RouteWithSubRoutes from './RouteWithSubRoutes';

const Section = ({ routes }) => {
  const match = useRouteMatch();
  console.log(match);

  return (
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
          <Route
            path={match.path}
            exact
          >
            <h1>Cars</h1>
          </Route>
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
};

export default Section;
