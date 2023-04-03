import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/auth-hook";
import { signOutUser } from "../../auth/services/auth-service";

export const DashboardLayout = ({ children, title, sideContent }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    signOutUser();
    navigate("/login", {
      state: { successMessage: "You have successfully logged out." },
    });
  };

  return (
    <div className="container mx-auto mb-10">
      
      <div className="flex justify-between my-6">
        <Link to="/" className="text-2xl font-bold">
          SpaceNote
        </Link>
        <p>
          Hello {user.user_metadata.name}{" "}
          <button type="button" onClick={logout} className="font-bold">
            Logout
          </button>
        </p>
      </div>

      <div className="flex justify-between my-6">
        <h1 className="text-xl font-bold">{title}</h1>
        {sideContent}
      </div>

      {children}
    </div>
  );
};

DashboardLayout.defaultProps = {
  sideContent: "",
};
