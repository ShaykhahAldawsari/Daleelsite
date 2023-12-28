import React, { createContext, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State to store the authenticated user and setAuthentication function
  const [loggedIn, setLoggedIn] = useState(false);

  // Function to set the authenticated user
  const setAuthentication = (user) => {
    setLoggedIn(user);
  };

  // Value to be provided by the context
  const authContextValue = {
    loggedIn,
    setAuthentication
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
