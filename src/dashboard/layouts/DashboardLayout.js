import React from "react";
import { Navbar } from "../components/Navbar";
export const DashboardLayout = ({ children, title, sideContent }) => {
  return (
    <>
      <Navbar />
      <div className="lg:container lg:mx-auto mb-10 mx-4">
        {title && (
          <div className="flex justify-between my-6">
            <h1 className="text-xl font-bold">{title}</h1>
            {sideContent}
          </div>
        )}

        {children}
      </div>
    </>
  );
};

DashboardLayout.defaultProps = {
  title: "",
  sideContent: "",
};
