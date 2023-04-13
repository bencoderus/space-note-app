import React, { createContext, useState } from "react";
import { getUserData } from "../services/auth-service";

export const AuthProviderContext = createContext({
  auth: { user: null, token: null },
  setAuth: (value) => value,
});

export const AuthContext = ({ children }) => {
  const userData = getUserData();
  const [auth, setAuth] = useState(userData);

  return (
    <AuthProviderContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthProviderContext.Provider>
  );
};
