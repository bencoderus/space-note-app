import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthButton } from "../../auth/components/AuthButton";
import { AuthSection } from "../../auth/components/AuthSection";
import { register } from "../services/auth-service";
import { PageTitle } from "../components/PageTitle";

export const Signup = () => {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const createAccount = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await register(form);

    if (!response.status) {
      const error = response?.data?.error?.message || response?.data?.message;

      setError(error);
      setLoading(false);
      return;
    }

    setLoading(false);

    navigate("/login", {
      state: {
        successMessage: response.data.message,
      },
    });
  };

  return (
    <AuthSection>
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="py-12 bg-gray-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <PageTitle />
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-gray-900 font-display font-semibold lg:text-left xl:text-5xl
            xl:text-bold"
          >
            Create an account
          </h2>
          <p className="my-4 text-red-600">{error}</p>
          <div className="mt-12">
            <form onSubmit={createAccount}>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Name
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-gray-500"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mt-8">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Email Address
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-gray-500"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Password
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-gray-500"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="mt-10">
                <AuthButton
                  text="Create an account"
                  type="submit"
                  loading={loading}
                />
              </div>
            </form>
            <div className="mt-12 text-sm font-display text-gray-700 text-center">
              Already a member?
              <Link
                to="/"
                className="cursor-pointer text-gray-600 font-bold hover:text-gray-800"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthSection>
  );
};
