/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

const initialState = {
  user: null,
  authenticated: false,
};

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialState);

  const signIn = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Signing in user...');
      setAuthState((prevState) => (
        {
          ...prevState,
          user: 'sven',
          authenticated: true,
        }
      ));
      resolve('OK');
    }, 1000);
  });

  return (
    <AuthContext.Provider value={{ authState, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
