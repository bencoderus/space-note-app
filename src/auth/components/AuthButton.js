import React from "react";
import { Spinner } from "../../common/components/Spinner";

// When there's an error message disable the button and show the text.
// When it is loading and there's no error, show `please wait` with a spinner.
// When it is not loading and there's no error, enable the button and show the text.
export const AuthButton = ({ type, text, loading, error }) => {
  return (
    <button
      className="bg-gray-800 text-gray-100 p-4 w-full rounded-full tracking-wide
          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-gray-900
          shadow-lg disabled:cursor-not-allowed"
      type={type}
      disabled={error || loading}
    >
      {error && text}

      {loading && !error && (
        <span>
          <Spinner />
          Please wait...
        </span>
      )}
      {!loading && !error && text}
    </button>
  );
};

AuthButton.defaultProps = {
  loading: false,
  error: "",
};
