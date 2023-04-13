import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth-hook";
import { isAuthenticated } from "../../auth/services/auth-service";

export const Guest = ({ children }) => {
  const { auth } = useAuth();

  return isAuthenticated(auth.token) ? <Navigate to="/" /> : children;
};
