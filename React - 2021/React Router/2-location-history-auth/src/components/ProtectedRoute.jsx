/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import {
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';

import { AuthContext } from '../contexts/AuthProvider';

const ProtectedRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  // location.pathname stores the current URL
  // {"pathname":"/protected","search":"","hash":"","key":"hyyl70"}
  console.log(JSON.stringify(location));

  return (
    <Route {...rest}>
      {
        auth.authState.user
          ? (children)
          : (
            <Redirect
              to={{
                pathname: '/login',
                // The <Redirect> is given a state object that stores the current URL.
                // In this case location.pathname = /protected
                // The /login route will use this pathname to automatically replace /login in
                // the browser history with /protected, once the user has logged in.
                // In other words, /login is completely eliminated from the browser history. This means that
                // when the user has reached the /protected route and goes back in the browser
                // the user is returned to '/' instead of /login. '/' is the route visted before
                // clicking on the /protected link.
                state: { from: location.pathname },
              }}
            />
          )
      }
    </Route>
  );
};

export default ProtectedRoute;
