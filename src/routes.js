import React from "react";
import { NotFound } from "./common/pages/NotFound";
import { Login } from "./auth/pages/Login";
import { ForgotPassword } from "./auth/pages/ForgotPassword";
import { Signup } from "./auth/pages/Signup";
import { Guest } from "./common/middlewares/Guest";
import { Auth } from "./common/middlewares/Auth";
import { Dashboard } from "./dashboard/pages/Dashboard";
import { ResetPassword } from "./auth/pages/ResetPassword";

export const routerRoutes = [
  {
    path: "/",
    element: (
      <Auth>
        <Dashboard />
      </Auth>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <Guest>
        <ForgotPassword />
      </Guest>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <Guest>
        <ResetPassword />
      </Guest>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <Guest>
        <Signup />
      </Guest>
    ),
  },
  {
    path: "/login",
    element: (
      <Guest>
        <Login />
      </Guest>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
