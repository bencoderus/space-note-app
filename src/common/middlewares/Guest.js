import React from "react";
import { Navigate } from "react-router-dom";
import { getAuthData } from "../../auth/services/auth-service";

export const Guest = ({ children }) => {
  const auth = getAuthData();

  return auth.isAuthenticated ? <Navigate to="/" /> : children
};
