import React from "react";

export const PageHeading = ({ title, subtitle }) => {
  return (
    <div className="my-4">
      <div className="text-2xl font-bold my-4">{title}</div>
      <div>{subtitle}</div>
    </div>
  );
};

PageHeading.defaultProps = {
  subtitle: "",
};
