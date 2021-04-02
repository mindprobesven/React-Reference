/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthProvider';

const Login = () => {
  const auth = useContext(AuthContext);
  // const location = useLocation();

  async function handleSignIn() {
    const result = await auth.signIn();
    console.log(result);
  }

  return (
    <div>
      <h1>Login</h1>
      <button type="button" onClick={() => handleSignIn()}>Sign in</button>
    </div>
  );
};

export default Login;
