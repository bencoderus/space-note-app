import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth-hook";
import { isAuthenticated } from "../../auth/services/auth-service";

export const Auth = ({ children }) => {
  const { auth } = useAuth();

  return isAuthenticated(auth.token) ? children : <Navigate to="/login" />;
};
