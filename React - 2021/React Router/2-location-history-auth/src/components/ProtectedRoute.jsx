/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthProvider';

const ProtectedRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  console.log(JSON.stringify(location));

  return auth.authState.user
    ? (
      <Route {...rest}>
        {children}
      </Route>
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location.pathname },
        }}
      />
    );
};

export default ProtectedRoute;
