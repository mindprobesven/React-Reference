/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthProvider';

const Login = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();

  // location now has a state object containing "from":"/protected"
  // {"pathname":"/login","state":{"from":"/protected"},"search":"","hash":"","key":"toe9vm"}
  console.log(JSON.stringify(location));

  // The ProtectedRoute has a <Redirect> to this /login route.
  // In the <Redirect> we stored the current URL using location.pathname in location.state
  // In this case location.pathname was /protected
  // The /login route will use this pathname to automatically replace /login in
  // the browser history with /protected, once the user has logged in.
  const { from } = location.state || { from: '/' };

  async function handleSignIn() {
    const isSignedIn = await auth.signIn();
    // When the user has logged in, /login will be replaced with /protected
    if (isSignedIn) history.replace(from);
  }

  return (
    <div>
      <h1>Login</h1>
      <button type="button" onClick={handleSignIn}>Sign in</button>
    </div>
  );
};

export default Login;
