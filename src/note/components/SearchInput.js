import React from "react";

export const SearchInput = ({handleChange}) => {
  return (
    <form className="my-5">
      <div className="flex justify-center">
          <input
            type="search"
            onChange={handleChange}
            id="search-dropdown"
            className="block rounded-full p-4 lg:w-8/12 w-full text-sm text-gray-900 bg-gray-50 border border-gray-400 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search note"
            required
          />
      </div>
    </form>
  );
};
