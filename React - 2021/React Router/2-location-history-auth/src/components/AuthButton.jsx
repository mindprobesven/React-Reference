/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthProvider';

const AuthButton = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  console.log(auth.authState);

  async function handleSignOut() {
    const isSignedOut = await auth.signOut();
    // When the user logs out, the user is send to the '/' route using history.push
    if (isSignedOut) history.push('/');
  }

  return auth.authState.user ? (
    <>
      <h3>Welcome!</h3>
      <button type="button" onClick={handleSignOut}>Sign out</button>
    </>
  ) : (
    <h3>You are not logged in!</h3>
  );
};

export default AuthButton;
