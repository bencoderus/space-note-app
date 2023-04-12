import React, { createContext } from "react";
import { getAuthData } from "../services/auth-service";

export const AuthProviderContext = createContext({
  isAuthenticated: false,
  user: null,
});

export const AuthContext = ({ children }) => {
  const auth = getAuthData();

  return (
    <AuthProviderContext.Provider value={auth}>
      {children}
    </AuthProviderContext.Provider>
  );
};
