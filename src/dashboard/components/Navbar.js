import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { signOutUser } from "../../auth/services/auth-service";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    signOutUser();
    navigate("/login", {
      state: { successMessage: "You have successfully logged out." },
    });
  };


  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="container mx-auto px-4 py-4 md:flex md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-white">
           SpaceNote
          </Link>
          <button
            className="md:hidden"
            onClick={toggleNavbar}
          >
            {isOpen ? <FaBars className="text-white" /> : <FaBars className="text-white"/>}
          </button>
        </div>
        <div className={`${isOpen ? "block" : "hidden"} mt-4 md:flex md:items-center md:mt-0`}>
          <Link
            to="/"
            className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-500 mr-6"
          >
            Home
          </Link>
          <Link
            to="/notes/create"
            className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-500 mr-6"
          >
            Create
          </Link>
          <Link
            to="/notes/archived"
            className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-500 mr-6"
          >
            Archived
          </Link>

          <Link
            to="/notes/trash"
            className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-500 mr-6"
          >
            Trash
          </Link>

          <button type="button" onClick={logout} className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-500">
              Logout
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
