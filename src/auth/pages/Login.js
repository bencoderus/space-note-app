import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthButton } from "../components/AuthButton";
import { AuthSection } from "../components/AuthSection";
import { attemptLogin, loginUser } from "../services/auth-service";
import { PageTitle } from "../components/PageTitle";
import { useAuth } from "../../common/hooks/auth-hook";
import { SocialLoginButton } from "../components/SocialLoginButton";

export const Login = () => {
  const [error, setError] = useState("");
  const [form, setForm] = useState({});
  const [, setAuth] = useAuth();
  const location = useLocation();
  const authMessage = location?.state?.authMessage || "";
  const errorMessage = location?.state?.errorMessage || "";
  const successMessage = location?.state?.successMessage || "";

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await attemptLogin(form);

    if (!response.status) {
      setError(response.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    loginUser(response.data.data, setAuth);

    navigate("/");
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
            Log in
          </h2>
          <p className="my-4 text-red-600">
            {error || authMessage || errorMessage}
          </p>
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

              <div className="mt-6">
                <SocialLoginButton
                  provider="google"
                  text={
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-4 h-4 mr-4"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="google"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 488 512"
                      >
                        <path
                          fill="currentColor"
                          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                        ></path>
                      </svg>
                      Sign in with Google
                    </span>
                  }
                />
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
