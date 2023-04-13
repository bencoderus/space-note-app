import React from "react";
import config from "../config";
import { Maintenance } from "../pages/Maintenance";

export const CheckMaintenance = ({ children }) => {
  return config.maintenanceActivated ? <Maintenance /> : children;
};
