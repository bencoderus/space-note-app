import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../auth/services/auth-service";
import { useAuth } from "../hooks/auth-hook";

export const Guest = ({ children }) => {
  const [auth]  = useAuth();

  return isAuthenticated(auth.token) ? <Navigate to="/" /> : children;
};
