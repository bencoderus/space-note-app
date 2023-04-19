import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./common/components/AppRouter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckMaintenance } from "./common/middlewares/CheckMaintenance";
import { Provider } from "react-redux";
import { store } from "./store";
import { AuthProvider } from "./common/context/AuthProvider";

export const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CheckMaintenance>
          <BrowserRouter>
            <AppRouter />
            <ToastContainer
              position={toast.POSITION.BOTTOM_LEFT}
              theme="dark"
            />
          </BrowserRouter>
        </CheckMaintenance>
      </AuthProvider>
    </Provider>
  );
};
