import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./common/components/AppRouter";

export const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};
