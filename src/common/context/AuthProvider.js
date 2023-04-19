import React, { createContext, useState } from "react";
import { getUserData } from "../../auth/services/auth-service";

export const AuthContext = createContext([]);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getUserData());

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
