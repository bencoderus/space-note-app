import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./common/components/AppRouter";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} theme="dark" />
    </BrowserRouter>
  );
};
