import React from "react";
import { NotFound } from "./common/pages/NotFound";
import { Login } from "./auth/pages/Login";
import { ForgotPassword } from "./auth/pages/ForgotPassword";
import { Signup } from "./auth/pages/Signup";
import { Guest } from "./common/middlewares/Guest";
import { Auth } from "./common/middlewares/Auth";
import { Dashboard } from "./dashboard/pages/Dashboard";
import { ResetPassword } from "./auth/pages/ResetPassword";
import { AddNote } from "./note/pages/AddNote";
import { ShowNote } from "./note/pages/ShowNote";
import { ArchivedNotes } from "./note/pages/ArchivedNotes";
import { DeletedNotes } from "./note/pages/DeletedNotes";
import { AuthenticateSocial } from "./auth/pages/AuthenticateSocial";

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
    path: "/notes/create",
    element: (
      <Auth>
        <AddNote />
      </Auth>
    ),
  },
  {
    path: "/notes/trash",
    element: (
      <Auth>
        <DeletedNotes />
      </Auth>
    ),
  },
  {
    path: "/notes/archived",
    element: (
      <Auth>
        <ArchivedNotes />
      </Auth>
    ),
  },
  {
    path: "/note/:id",
    element: (
      <Auth>
        <ShowNote />
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
    path: "/auth/initiate",
    element: (
      <Guest>
        <AuthenticateSocial />
      </Guest>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
