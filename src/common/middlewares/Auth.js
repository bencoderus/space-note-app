import React from "react";
import { Navigate } from "react-router-dom";
import { getAuthData } from "../../auth/services/auth-service";

export const Auth = ({ children }) => {
  const auth = getAuthData();

  return auth.isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};
