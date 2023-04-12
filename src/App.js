import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./common/components/AppRouter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./auth/contexts/AuthContext";
import { CheckMaintenance } from "./common/middlewares/CheckMaintenance";

export const App = () => {
  return (
    <CheckMaintenance>
      <AuthContext>
        <BrowserRouter>
          <AppRouter />
          <ToastContainer position={toast.POSITION.BOTTOM_LEFT} theme="dark" />
        </BrowserRouter>
      </AuthContext>
    </CheckMaintenance>
  );
};
