/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';

import { AuthContext } from '../contexts/AuthProvider';

const AuthButton = () => {
  const auth = useContext(AuthContext);

  console.log(auth.authState);

  const handleSignIn = () => {
    auth.signIn();
  };

  return auth.authState.user ? (
    <>
      <h3>Welcome!</h3>
      <button type="button" onClick={handleSignIn}>Sign out</button>
    </>
  ) : (
    <h3>You are not logged in!</h3>
  );
};

export default AuthButton;
