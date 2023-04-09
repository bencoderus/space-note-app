import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthButton } from "../../auth/components/AuthButton";
import { AuthSection } from "../../auth/components/AuthSection";
import { forgotPassword, PASSWORD_RESET_ROUTE } from "../services/auth-service";
import { PageTitle } from "../components/PageTitle";

export const ForgotPassword = () => {
  const [message, setMessage] = useState({ type: "", content: "" });
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await forgotPassword({
      redirectTo: PASSWORD_RESET_ROUTE,
      ...form,
    });

    if (!response.status) {
      setMessage({
        type: "error",
        content: response?.data?.message,
      });

      setLoading(false);
      return;
    }

    setLoading(false);

    setMessage({
      type: "success",
      content: response?.data?.message,
    });

    navigate("/login", {
      state: {
        successMessage: "A password reset email has been sent to you.",
      },
    });
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
            Forgot Password
          </h2>
          {message.type === "error" ? (
            <p className="my-4 text-red-600">{message.content}</p>
          ) : (
            ""
          )}
          <div className="mt-12">
            <form onSubmit={handleSubmit}>
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
              <div className="mt-10">
                <AuthButton
                  text="Reset password"
                  type="submit"
                  loading={loading}
                />
              </div>
            </form>
            <div className="mt-12 text-sm font-display text-gray-700 text-center">
              Remembered your password ?
              <Link
                to="/"
                className="cursor-pointer font-bold text-gray-600 hover:text-gray-800"
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
