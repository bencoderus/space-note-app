import React from "react";

export const AuthButton = ({ type, text, loading }) => {
  return (
    <button
      className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
          shadow-lg disabled:cursor-not-allowed"
      type={type}
      disabled={loading}
    >
      {loading ? "Please wait" : text}
    </button>
  );
};

AuthButton.defaultProps = {
  loading: false,
  label: "Button Text"
};
