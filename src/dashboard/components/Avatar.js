import React from "react";

export const Avatar = ({ name }) => {
  const letter = name ? name[0] : "";

  return (
    <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-green-600 rounded-full dark:bg-green-600">
      <span className="font-medium text-gray-100 dark:text-gray-100">{letter}</span>
    </div>
  );
};
