import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthButton } from "../components/AuthButton";
import { AuthSection } from "../components/AuthSection";
import { attemptLogin, loginUser } from "../services/auth-service";
import { PageTitle } from "../components/PageTitle";

export const Login = () => {
  const [error, setError] = useState("");
  const [form, setForm] = useState({});
  const location = useLocation();
  const authMessage = location?.state?.authMessage || ""
  const errorMessage = location?.state?.errorMessage || ""
  const successMessage = location?.state?.successMessage || ""

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true)
    const response = await attemptLogin(form);

    if (!response.status) {
      setError(response.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    loginUser(response.data.data);

    navigate('/')
  };

  return (
    <AuthSection>
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="py-12 bg-gray-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <PageTitle/>
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-gray-900 font-display font-semibold lg:text-left xl:text-5xl
            xl:text-bold"
          >
            Log in
          </h2>
          <p className="my-4 text-red-600">{error || authMessage || errorMessage}</p>
          <p className="my-4 text-green-600">{successMessage}</p>
          <div className="mt-12">
            <form onSubmit={handleLogin}>
              <div>
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
                  <div>
                    <Link
                      to="/forgot-password"
                      className="text-xs font-display font-semibold text-gray-600 hover:text-gray-800
                                cursor-pointer"
                    >
                      Forgot Password?
                    </Link>
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
                <AuthButton text="Log In" type="submit" loading={loading} />
              </div>
            </form>
            <div className="mt-12 text-sm font-display text-gray-700 text-center">
              Don't have an account ?
              <Link
                to="/sign-up"
                className="cursor-pointer text-gray-600 hover:text-gray-800 font-bold"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthSection>
  );
};
