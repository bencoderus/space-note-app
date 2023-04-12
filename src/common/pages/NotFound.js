import React from "react";

export const NotFound = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="flex justify-center min-h-screen items-center m-4 lg:container lg:mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold">404</h1>
        <h1 className="text-xl font-bold my-2">Page not found.</h1>
        <p className="text-lg my-4">
          Hey there! The page you are looking for wasn't found.
        </p>
        <button
          type="button"
          className="bg-gray-800 text-white py-2 px-6 rounded hover:font-bold"
          onClick={goBack}
        >
          Go back
        </button>
      </div>
    </div>
  );
};
