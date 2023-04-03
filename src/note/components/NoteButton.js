import React from "react";
import { Spinner } from "../../common/components/Spinner";

export const NoteButton = ({ loading, text }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="text-white bg-gradient-to-br w-full p-4 from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center mr-2 mb-2"
    >
      {loading ? (
        <>
          <Spinner /> Please wait...
        </>
      ) : (
        <> {text}</>
      )}
    </button>
  );
};
