import React, { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { signOutUser } from "../../auth/services/auth-service";
import { Avatar } from "./Avatar";
import { useAuth } from "../../common/hooks/auth-hook";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const navigate = useNavigate();
  const auth = useAuth();
  const name = auth?.user?.user_metadata?.name;

  const logout = () => {
    signOutUser();
    navigate("/login");
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    // @ts-ignore
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setProfileOpen(false);
    }
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto container px-2 sm:px-6 lg:px-0">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              onClick={() => setOpen((state) => !state)}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {open ? (
                <FaBars className="text-white" />
              ) : (
                <FaBars className="text-white" />
              )}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <NavLink to="/" className="text-xl font-bold text-white">
                SpaceNote
              </NavLink>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  }
                  aria-current="page"
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/notes/create"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  }
                >
                  Create
                </NavLink>

                <NavLink
                  to="/notes/archived"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  }
                >
                  Archive
                </NavLink>

                <NavLink
                  to="/notes/trash"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  }
                >
                  Trash
                </NavLink>
              </div>
            </div>
          </div>
          <div className="flex absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <button
              type="button"
              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button> */}
            <div className="relative ml-3" ref={profileRef}>
              <div>
                <button
                  type="button"
                  className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  onClick={() => setProfileOpen((state) => !state)}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <Avatar name={name}/>
                  {/* <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  /> */}
                </button>
              </div>

              <div
                className={`${
                  profileOpen ? "" : "hidden"
                }  absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <NavLink
                  to="/notes/archived"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  id="user-menu-item-0"
                >
                  Archived
                </NavLink>
                <NavLink
                  to="/notes/trash"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  id="user-menu-item-1"
                >
                  Trash
                </NavLink>
                <button
                  type="button"
                  onClick={logout}
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  id="user-menu-item-2"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${open ? "sm:hidden" : "hidden"}`} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                : "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            }
            aria-current="page"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/notes/create"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                : "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            }
          >
            Create
          </NavLink>

          <NavLink
            to="/notes/archived"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                : "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            }
          >
            Archive
          </NavLink>

          <NavLink
            to="/notes/trash"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                : "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            }
          >
            Trash
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
